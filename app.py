# app.py — Flask application for the personal portfolio
#
# Run with:
#   python init_db.py   (once, to create the database)
#   python app.py        (start the development server)

import os
import secrets
import sqlite3
from pathlib import Path
from functools import wraps

from dotenv import load_dotenv
from flask import (
    Flask, render_template, request, redirect,
    url_for, session, abort, flash,
)
from flask_wtf.csrf import CSRFProtect
from werkzeug.security import check_password_hash

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Secret key from .env (generate a random one if not set)
app.secret_key = os.environ.get("SECRET_KEY") or secrets.token_hex(32)

# CSRF protection
csrf = CSRFProtect(app)

# Admin password hash from .env
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "")

# Login rate limiting
MAX_LOGIN_ATTEMPTS = 5
LOCKOUT_MINUTES = 60

# Path to the SQLite database file (absolute to avoid CWD issues)
BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "database.db"


# --- Database helper ---

def get_db():
    """Open a connection to the SQLite database.
    Rows are returned as dict-like objects so you can use row['column']."""
    conn = sqlite3.connect(str(DATABASE))
    conn.row_factory = sqlite3.Row
    return conn


# --- Admin access helper ---

def admin_required(f):
    """Decorator: redirect to login page if user is not authenticated."""
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("admin"):
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated


# =====================
#    PUBLIC ROUTES
# =====================

@app.route("/")
def index():
    """Welcome page with navigation cards."""
    return render_template("index.html")


@app.route("/about")
def about():
    """About Me page — bio and skills."""
    return render_template("about.html")


@app.route("/projects")
def projects():
    """List all projects from the database."""
    db = get_db()
    rows = db.execute("SELECT * FROM project ORDER BY id DESC").fetchall()
    db.close()
    return render_template("projects.html", projects=rows)


@app.route("/project/<int:project_id>")
def project(project_id):
    """Detail page for a single project."""
    db = get_db()
    row = db.execute(
        "SELECT * FROM project WHERE id = ?", (project_id,)
    ).fetchone()
    db.close()
    if row is None:
        abort(404)
    return render_template("project.html", project=row)


@app.route("/research")
def research():
    """List all research posts from the database."""
    db = get_db()
    rows = db.execute("SELECT * FROM post ORDER BY created_at DESC").fetchall()
    db.close()
    return render_template("research.html", posts=rows)


@app.route("/post/<int:post_id>")
def post(post_id):
    """Detail page for a single post."""
    db = get_db()
    row = db.execute(
        "SELECT * FROM post WHERE id = ?", (post_id,)
    ).fetchone()
    db.close()
    if row is None:
        abort(404)
    return render_template("post.html", post=row)


@app.route("/contacts")
def contacts():
    """Contact information page."""
    return render_template("contacts.html")


# =====================
#    AUTH ROUTES
# =====================

@app.route("/login", methods=["GET", "POST"])
def login():
    """Simple password login for admin access with rate limiting."""
    db = get_db()

    # Clean up old attempts and count recent ones
    db.execute(
        "DELETE FROM login_attempt WHERE attempted_at < datetime('now', ?)",
        (f"-{LOCKOUT_MINUTES} minutes",),
    )
    db.commit()
    count = db.execute("SELECT COUNT(*) FROM login_attempt").fetchone()[0]
    locked = count >= MAX_LOGIN_ATTEMPTS

    if request.method == "POST":
        if locked:
            db.close()
            return render_template("login.html", error="Забагато спроб. Спробуйте через годину.")

        if check_password_hash(ADMIN_PASSWORD_HASH, request.form.get("password", "")):
            db.execute("DELETE FROM login_attempt")
            db.commit()
            db.close()
            session["admin"] = True
            return redirect(url_for("admin"))

        # Record failed attempt
        db.execute("INSERT INTO login_attempt (attempted_at) VALUES (datetime('now'))")
        db.commit()
        db.close()
        return render_template("login.html", error="Невірний пароль.")

    db.close()
    if locked:
        return render_template("login.html", error="Забагато спроб. Спробуйте через годину.")
    return render_template("login.html")


@app.route("/logout")
def logout():
    """Clear admin session and return to the welcome page."""
    session.pop("admin", None)
    return redirect(url_for("index"))


# =====================
#    ADMIN ROUTES
# =====================

@app.route("/admin")
@admin_required
def admin():
    """Admin dashboard — lists all projects and posts."""
    db = get_db()
    project_rows = db.execute("SELECT * FROM project ORDER BY id DESC").fetchall()
    post_rows = db.execute("SELECT * FROM post ORDER BY created_at DESC").fetchall()
    db.close()
    return render_template("admin.html", projects=project_rows, posts=post_rows)


# --- Project management ---

@app.route("/admin/new-project", methods=["GET", "POST"])
@admin_required
def new_project():
    """Form to create a new project."""
    if request.method == "POST":
        title = request.form["title"]
        description = request.form["description"]
        github_link = request.form.get("github_link", "")
        db = get_db()
        db.execute(
            "INSERT INTO project (title, description, github_link) VALUES (?, ?, ?)",
            (title, description, github_link),
        )
        db.commit()
        db.close()
        flash("Проект створено", "success")
        return redirect(url_for("admin"))
    return render_template("edit_project.html", project=None)


@app.route("/admin/edit-project/<int:project_id>", methods=["GET", "POST"])
@admin_required
def edit_project(project_id):
    """Form to edit an existing project."""
    db = get_db()
    if request.method == "POST":
        title = request.form["title"]
        description = request.form["description"]
        github_link = request.form.get("github_link", "")
        db.execute(
            "UPDATE project SET title = ?, description = ?, github_link = ? WHERE id = ?",
            (title, description, github_link, project_id),
        )
        db.commit()
        db.close()
        flash("Проект оновлено", "success")
        return redirect(url_for("admin"))
    row = db.execute(
        "SELECT * FROM project WHERE id = ?", (project_id,)
    ).fetchone()
    db.close()
    if row is None:
        abort(404)
    return render_template("edit_project.html", project=row)


@app.route("/admin/delete-project/<int:project_id>", methods=["POST"])
@admin_required
def delete_project(project_id):
    """Delete a project (POST only)."""
    db = get_db()
    db.execute("DELETE FROM project WHERE id = ?", (project_id,))
    db.commit()
    db.close()
    flash("Проект видалено", "success")
    return redirect(url_for("admin"))


# --- Post management ---

@app.route("/admin/new-post", methods=["GET", "POST"])
@admin_required
def new_post():
    """Form to create a new research post."""
    if request.method == "POST":
        title = request.form["title"]
        summary = request.form["summary"]
        content = request.form["content"].replace("\r\n", "\n")
        db = get_db()
        db.execute(
            "INSERT INTO post (title, summary, content, created_at) "
            "VALUES (?, ?, ?, datetime('now'))",
            (title, summary, content),
        )
        db.commit()
        db.close()
        flash("Пост створено", "success")
        return redirect(url_for("admin"))
    return render_template("edit_post.html", post=None)


@app.route("/admin/edit-post/<int:post_id>", methods=["GET", "POST"])
@admin_required
def edit_post(post_id):
    """Form to edit an existing post."""
    db = get_db()
    if request.method == "POST":
        title = request.form["title"]
        summary = request.form["summary"]
        content = request.form["content"].replace("\r\n", "\n")
        db.execute(
            "UPDATE post SET title = ?, summary = ?, content = ? WHERE id = ?",
            (title, summary, content, post_id),
        )
        db.commit()
        db.close()
        flash("Пост оновлено", "success")
        return redirect(url_for("admin"))
    row = db.execute(
        "SELECT * FROM post WHERE id = ?", (post_id,)
    ).fetchone()
    db.close()
    if row is None:
        abort(404)
    return render_template("edit_post.html", post=row)


@app.route("/admin/delete-post/<int:post_id>", methods=["POST"])
@admin_required
def delete_post(post_id):
    """Delete a post (POST only)."""
    db = get_db()
    db.execute("DELETE FROM post WHERE id = ?", (post_id,))
    db.commit()
    db.close()
    flash("Пост видалено", "success")
    return redirect(url_for("admin"))


# =====================
#    ERROR HANDLERS
# =====================

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


# =====================
#    RUN
# =====================

if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG", "0") == "1")
