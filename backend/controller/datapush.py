import random
import requests
from datetime import datetime, timedelta
import time

# Base URL for the backend
BASE_URL = "http://localhost:4000/backend/insertData"

# Function to generate random sensor data and a date
def generate_data():
    R_N = "04"
    sensor1 = random.randint(20, 30)
    sensor2 = random.randint(20, 30)
    sensor3 = random.randint(20, 30)
    sensor4 = random.randint(0, 0)
    sensor5 = random.randint(0, 0)

    # Generate a random date within the current month
    today = datetime.now()
    start_of_month = today.replace(day=1)
    days_in_month = (start_of_month.replace(month=today.month % 12 + 1, day=1) - timedelta(days=1)).day
    random_day = random.randint(1, days_in_month)
    random_date = start_of_month.replace(day=random_day)
    time = random_date.strftime("%Y-%m-%d %H:%M:%S")

    return {
        "R_N": R_N,
        "sensor1": sensor1,
        "sensor2": sensor2,
        "sensor3": sensor3,
        "sensor4": sensor4,
        "sensor5": sensor5,
        "time": time
    }

# Function to send data
def send_data():
    data = generate_data()
    try:
        response = requests.get(BASE_URL, params=data)
        if response.status_code == 200:
            print("Data inserted successfully:", data)
        else:
            print("Failed to insert data:", response.status_code, response.text)
    except requests.RequestException as e:
        print("Error occurred while sending data:", e)

# Continuous data push with a delay
def continuous_push(interval=5):
    while True:
        send_data()
        time.sleep(0.3)  # Delay between pushes (in seconds)

# Start pushing data continuously
if __name__ == "__main__":
    print("Starting continuous data push. Press Ctrl+C to stop.")
    try:
        continuous_push(interval=5)  # Adjust interval as needed
    except KeyboardInterrupt:
        print("\nData push stopped.")
