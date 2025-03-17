# Admin Dashboard

## Overview
The Admin Dashboard provides functionalities to manage agents, upload CSV files, distribute tasks, and view assigned lists. This project is built using React.js for the frontend and Node.js with MongoDB for the backend.

## Features

### 1. Add Agents
- Create a feature to add agents.
- Each agent has the following details:
  - Name
  - Email
  - Mobile Number (with country code)
  - Password

### 2. Upload CSV and Distribute Lists
- Upload a CSV file containing a list of tasks with:
  - First Name – Text
  - Phone – Number
  - Notes – Text
- Validate the file upload to accept only `csv`, `xlsx`, and `xls` formats.
- Ensure the uploaded CSV follows the correct format.
- Distribute the tasks equally among 5 agents:
  - Example: If there are 25 tasks, each agent receives 5 tasks.
  - If tasks are not evenly divisible, distribute the remaining tasks sequentially.
- Save the distributed lists in MongoDB.
- Display the distributed lists for each agent on the frontend.

## Setup Instructions

### 1. Prerequisites
Make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or cloud, e.g., MongoDB Atlas)

### 2. Clone the Repository
```sh
 git clone <repository-url>
 cd admin-dashboard
```

### 3. Install Dependencies
```sh
 npm install
```

### 4. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
MONGO_URI=<your-mongodb-connection-string>
PORT=9000
JWT_SECRET=<your-secret-key>
```

### 5. Start the Backend Server
```sh
 node server.js
```

### 6. Start the Frontend
```sh
 cd client
 npm install
 npm start
```

## API Endpoints

### 1. Agent Management
#### Register Agent
```http
POST /api/admin/create
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securepassword"
}
```

### 2. Upload CSV
#### Upload and Distribute Tasks
```http
POST /api/admin/upload
```
**Request:** Multipart form-data containing the CSV file.

### 3. Fetch Data
#### Get All Agents
```http
GET /api/admin/agents
```

#### Get Distributed Tasks
```http
GET /api/admin/tasks
```

## Evaluation Criteria
1. **Functionality:** Does the application meet the requirements?
2. **Code Quality:** Is the code clean, readable, and well-documented?
3. **Validation and Error Handling:** Are edge cases handled effectively?
4. **User Interface:** Is the interface user-friendly?
5. **Execution:** Is the application easy to set up and run?

## License
This project is open-source and available under the MIT License.

