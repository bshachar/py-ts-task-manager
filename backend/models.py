from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from database import Base
import datetime
import enum
import uuid

class Status(str, enum.Enum):
    Backlog = 'Backlog'
    Todo = 'To Do'
    InProgress = 'In Progress'
    Done = 'Done'

class Priority(str, enum.Enum):
    NoPriority = 'No Priority'
    Low = 'Low'
    Medium = 'Medium'
    High = 'High'
    Urgent = 'Urgent'

# Mapping for Hebrew translations (used in frontend)
STATUS_HEBREW = {
    'Backlog': 'צבר עבודות',
    'To Do': 'לביצוע',
    'In Progress': 'בביצוע',
    'Done': 'הושלם',
}

PRIORITY_HEBREW = {
    'No Priority': 'ללא עדיפות',
    'Low': 'נמוכה',
    'Medium': 'בינונית',
    'High': 'גבוהה',
    'Urgent': 'דחוף',
}

# Reverse mapping (Hebrew to English)
STATUS_ENGLISH = {v: k for k, v in STATUS_HEBREW.items()}
PRIORITY_ENGLISH = {v: k for k, v in PRIORITY_HEBREW.items()}

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    tasks = relationship("Task", back_populates="owner")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String, index=True)
    description = Column(String)
    status = Column(String, default=Status.Todo) # Storing enum as string for simplicity
    priority = Column(String, default=Priority.NoPriority)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="tasks")
