from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from db.db import get_db
from db.models import User
from Router import users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(users.router)

origins = ["http://localhost:5173", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
