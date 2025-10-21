from db.db import SessionLocal
from db.models import User

db = SessionLocal()

new_user = User(
    email="loic@oui.com",
    hashed_password="password123",
    name="Loïc Rouzaud"
)

db.add(new_user)
db.commit()
db.refresh(new_user)

print("User créé :", new_user.id, new_user.email)

db.close()
