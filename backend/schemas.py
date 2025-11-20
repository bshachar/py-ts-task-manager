from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime
from models import Status, Priority, STATUS_HEBREW, PRIORITY_HEBREW, STATUS_ENGLISH, PRIORITY_ENGLISH

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = 'To Do'
    priority: str = 'No Priority'
    
    @validator('status', pre=True)
    def convert_status_to_english(cls, v):
        # If it's Hebrew, convert to English for storage
        if v in STATUS_ENGLISH:
            return STATUS_ENGLISH[v]
        # If it's already English or a valid Status enum, return as is
        return v
    
    @validator('priority', pre=True)
    def convert_priority_to_english(cls, v):
        # If it's Hebrew, convert to English for storage
        if v in PRIORITY_ENGLISH:
            return PRIORITY_ENGLISH[v]
        # If it's already English or a valid Priority enum, return as is
        return v

class TaskCreate(TaskBase):
    pass

class Task(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    created_at: datetime
    owner_id: int

    class Config:
        orm_mode = True
    
    @validator('status', pre=False)
    def convert_status_to_hebrew(cls, v):
        # Convert English to Hebrew for frontend
        return STATUS_HEBREW.get(v, v)
    
    @validator('priority', pre=False)
    def convert_priority_to_hebrew(cls, v):
        # Convert English to Hebrew for frontend
        return PRIORITY_HEBREW.get(v, v)

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    tasks: List[Task] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
