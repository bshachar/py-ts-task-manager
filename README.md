<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Task Manager App

This is a full-stack task manager application with a React frontend and a Python (FastAPI) backend.

## Features
- Kanban Board and List View
- Create, Edit, Delete Tasks
- User Authentication (Login/Register)
- Database Persistence (SQLite)

## Setup & Run

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run at `http://localhost:8000`.

### Frontend

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173` (or similar).

## Usage

1. Open the frontend in your browser.
2. Sign up for a new account.
3. Log in to manage your tasks.
