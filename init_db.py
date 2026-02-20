# init_db.py — Create the database tables and insert initial data
#
# Run once before starting the app:
#   python init_db.py

import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "database.db"


def init():
    conn = sqlite3.connect(str(DATABASE))
    cursor = conn.cursor()

    # --- Create tables ---

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS project (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            title       TEXT NOT NULL,
            description TEXT NOT NULL,
            github_link TEXT NOT NULL DEFAULT ''
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS post (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            title      TEXT NOT NULL,
            summary    TEXT NOT NULL,
            content    TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS login_attempt (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            attempted_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    """)

    # --- Seed data (only if tables are empty) ---

    cursor.execute("SELECT COUNT(*) FROM project")
    if cursor.fetchone()[0] == 0:
        cursor.executemany(
            "INSERT INTO project (title, description, github_link) VALUES (?, ?, ?)",
            [
                (
                    "PyGlow",
                    "Minimal Python code editor with syntax highlighting "
                    "and local autocomplete. Built with PySide6 and Pygments.",
                    "https://github.com/Yaroslav-K-V/PyGlow",
                ),
                (
                    "Car Managing Book",
                    "A Windows desktop application for tracking and managing "
                    "vehicle maintenance records.",
                    "https://github.com/Yaroslav-K-V/Car-Managing-Book",
                ),
                (
                    "Telegram Post Scheduler Bot",
                    "A Telegram bot that allows users to schedule posts "
                    "to channels and groups.",
                    "https://github.com/Yaroslav-K-V/Telegram-Post-Scheduler-Bot",
                ),
            ],
        )

    cursor.execute("SELECT COUNT(*) FROM post")
    if cursor.fetchone()[0] == 0:
        cursor.executemany(
            "INSERT INTO post (title, summary, content, created_at) VALUES (?, ?, ?, ?)",
            [
                (
                    "On Minimal Web Design",
                    "Notes on why simple websites load faster, last longer, "
                    "and are easier to maintain than complex ones.",
                    "Most modern websites are overloaded with frameworks, trackers, "
                    "and dozens of third-party scripts. They load slowly and break often. "
                    "A minimal website avoids these problems by design.\n\n"
                    "A plain HTML page with a small stylesheet loads in milliseconds. "
                    "It works on any device, any browser, and any connection speed. "
                    "There is nothing to compile and nothing to update.\n\n"
                    "This does not mean the site has to look bad. Careful use of spacing, "
                    "readable fonts, and a limited color palette can produce a page that "
                    "is pleasant to read without any decoration.\n\n"
                    "The constraint is useful. When you cannot rely on visual effects, "
                    "you focus on the content itself. That is usually what matters.",
                    "2026-02-01",
                ),
                (
                    "Learning in Public",
                    "A short reflection on writing about what you learn, "
                    "even when you are still a beginner.",
                    "It is tempting to wait until you are an expert before writing "
                    "about a subject. You worry that you will say something incorrect "
                    "or obvious. But writing about what you learn helps you understand "
                    "it better.\n\n"
                    "A short note forces you to organize your thoughts. If you cannot "
                    "explain something in a few sentences, you probably do not "
                    "understand it yet. Writing reveals the gaps.\n\n"
                    "It also creates a record. Months later, you can look back at what "
                    "you wrote and see how your understanding has changed. That is "
                    "valuable even if no one else reads it.",
                    "2026-01-15",
                ),
            ],
        )

    conn.commit()
    conn.close()
    print("Database initialized.")


if __name__ == "__main__":
    init()
