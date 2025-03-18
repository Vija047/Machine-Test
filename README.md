# MERN Stack Project

## Overview
This is a **MERN Stack** project that includes **user authentication, task management, and file upload functionality**. The application is built using **MongoDB, Express.js, React.js, and Node.js**.

## Features
- **User Authentication** (Register/Login with JWT Authentication)
- **Role-based Access Control** (Admin & Agent)
- **Task Management** (Admin can assign tasks to agents)
- **CSV File Upload & Task Distribution**
- **Frontend UI for Managing Users and Tasks**

---

## Tech Stack
### Backend (Node.js + Express.js)
- **Node.js**: Runtime for JavaScript
- **Express.js**: Framework for handling API requests
- **MongoDB + Mongoose**: Database and ORM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: Authentication
- **multer**: File upload handling
- **csv-parser**: CSV file processing

### Frontend (React.js)
- **React.js**: Frontend framework
- **React Router**: Navigation management
- **Axios**: API communication
- **Tailwind CSS / Bootstrap**: Styling

---

## Backend Setup
### Installation
```sh
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the `backend` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server
```sh
npm start
```

---

## Frontend Setup
### Installation
```sh
cd frontend
npm install
```

### Running the Frontend
```sh
npm start
```

---

## API Endpoints
### User Authentication
- **POST /api/auth/register** → Register a new user
- **POST /api/auth/login** → Login user

### Admin Features
- **POST /api/admin/create-agent** → Create an agent
- **POST /api/admin/upload-csv** → Upload CSV file & distribute tasks
- **GET /api/admin/tasks** → View all tasks

---

## File Upload (CSV)
- **Multer** is used for handling file uploads.
- CSV files can be uploaded via the `/api/admin/upload-csv` endpoint.
- Uploaded tasks are **automatically distributed among agents**.

---

## Deployment
- **Backend**: Deployed on AWS / Heroku
- **Frontend**: Deployed on Vercel / Netlify
- **Database**: MongoDB Atlas

---

## How to Contribute
1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

---

## License
This project is licensed under the MIT License.

---

###  Developed By
**Vijay kumar** 

