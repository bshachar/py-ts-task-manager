import requests

BASE_URL = "http://localhost:8000"

def test_flow():
    email = "test@example.com"
    password = "password123"

    # 1. Create User
    print("Creating user...")
    response = requests.post(f"{BASE_URL}/users/", json={"email": email, "password": password})
    if response.status_code == 200:
        print("User created successfully")
    elif response.status_code == 400 and "Email already registered" in response.text:
        print("User already exists")
    else:
        print(f"Failed to create user: {response.status_code} {response.text}")
        return

    # 2. Login
    print("Logging in...")
    response = requests.post(f"{BASE_URL}/token", data={"username": email, "password": password})
    if response.status_code == 200:
        token = response.json()["access_token"]
        print("Login successful, token received")
    else:
        print(f"Login failed: {response.status_code} {response.text}")
        return

    # 3. Create Task
    print("Creating task...")
    headers = {"Authorization": f"Bearer {token}"}
    task_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "status": "To Do",
        "priority": "High"
    }
    response = requests.post(f"{BASE_URL}/tasks/", json=task_data, headers=headers)
    if response.status_code == 200:
        print("Task created successfully")
    else:
        print(f"Failed to create task: {response.status_code} {response.text}")

    # 4. List Tasks
    print("Listing tasks...")
    response = requests.get(f"{BASE_URL}/tasks/", headers=headers)
    if response.status_code == 200:
        tasks = response.json()
        print(f"Tasks retrieved: {len(tasks)}")
        print(tasks)
    else:
        print(f"Failed to list tasks: {response.status_code} {response.text}")

if __name__ == "__main__":
    test_flow()
