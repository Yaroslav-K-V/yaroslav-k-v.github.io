# set_password.py — Generate a password hash and save it to .env
#
# Usage:
#   python set_password.py

import getpass
from pathlib import Path

from werkzeug.security import generate_password_hash

password = getpass.getpass("Enter new admin password: ")
confirm = getpass.getpass("Confirm password: ")

if password != confirm:
    print("Passwords do not match.")
    raise SystemExit(1)

if len(password) < 6:
    print("Password must be at least 6 characters.")
    raise SystemExit(1)

password_hash = generate_password_hash(password)

env_path = Path(__file__).resolve().parent / ".env"

if env_path.exists():
    lines = env_path.read_text(encoding="utf-8").splitlines()
    new_lines = [
        line for line in lines
        if not line.startswith("ADMIN_PASSWORD_HASH=")
    ]
    new_lines.append(f"ADMIN_PASSWORD_HASH={password_hash}")
    env_path.write_text("\n".join(new_lines) + "\n", encoding="utf-8")
else:
    env_path.write_text(f"ADMIN_PASSWORD_HASH={password_hash}\n", encoding="utf-8")

print("Password hash saved to .env")