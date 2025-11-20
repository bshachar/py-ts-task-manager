import requests

BASE_URL = "http://localhost:8000"

# Test getting tasks without search parameter
print("Testing GET /tasks/ without search parameter...")
try:
    # First, login to get a token (use your test account)
    email = "test@example.com"
    password = "password123"
    
    formData = {"username": email, "password": password}
    response = requests.post(f"{BASE_URL}/token", data=formData)
    
    if response.status_code == 200:
        token = response.json()["access_token"]
        print(f"✓ Login successful")
        
        # Test 1: Get tasks without any search parameter
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/tasks/", headers=headers)
        print(f"\nTest 1 - No search parameter:")
        print(f"Status: {response.status_code}")
        print(f"Tasks count: {len(response.json())}")
        print(f"Tasks: {response.json()}")
        
        # Test 2: Get tasks with empty search parameter
        response = requests.get(f"{BASE_URL}/tasks/?search=", headers=headers)
        print(f"\nTest 2 - Empty search parameter:")
        print(f"Status: {response.status_code}")
        print(f"Tasks count: {len(response.json())}")
        
        # Test 3: Get tasks with actual search
        response = requests.get(f"{BASE_URL}/tasks/?search=test", headers=headers)
        print(f"\nTest 3 - Search for 'test':")
        print(f"Status: {response.status_code}")
        print(f"Tasks count: {len(response.json())}")
        
    else:
        print(f"✗ Login failed: {response.status_code} - {response.text}")
        
except Exception as e:
    print(f"Error: {e}")
