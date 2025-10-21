from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.db import SessionLocal
from db.models import User

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/user")
def get_user(db: Session = Depends(get_db)):
    user = db.query(User).first() # juste du test, donc ça chope que le premier user
    if user:
        return {"id": user.id, "name": user.name, "email": user.email} # j'ai rajouté manuellement un user dans la db histoire de tester
    return {"message": "No user found"}
