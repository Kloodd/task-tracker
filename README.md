# Task Tracker

A full-stack task management application built using React, Ant Design, Express.js, and Microsoft SQL Server.

The application allows users to register, login, and manage their own tasks with task status tracking, due dates, overdue detection, and reporting.

---

## Features

- User registration
- User login with JWT authentication
- Secure password hashing
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Task status management
- Due date tracking
- Overdue task detection
- Task summary reports
- Protected routes

---

## Tech Stack

### Frontend
- React
- Ant Design
- React Router
- Vite

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- Microsoft SQL Server

## Project Structure

```
task-tracker/
│
├── client/
│   └── React frontend
│
├── server/
│   └── Express API
│
└── database/
    └── SQL scripts
```

## API Features

The backend provides RESTful API endpoints for:

- User registration and login
- JWT authentication
- Create tasks
- Retrieve tasks
- Update tasks
- Delete tasks
- Task summary reports

---

## Installation and Setup

### 1. Clone repository

```bash
git clone (https://github.com/Kloodd/task-tracker.git)
```

Navigate into the project:

```bash
cd task-tracker
```
---

## Database Setup

1. Open Microsoft SQL Server Management Studio (SSMS) or your preferred SQL Server tool.

2. Run the SQL script located at:

```
database/schema.sql
```

3. This will create the required database and tables:

- TaskTracker database
- Users table
- Tasks table

4. Make sure your SQL Server instance is running before starting the backend.
---

## Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=your_server_name
DB_DATABASE=TaskTracker
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

The backend API will run on:

```
http://localhost:5000
```

---

## Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will run on:

```
http://localhost:5173
```

---

## Usage

1. Open the application in your browser.
2. Register a new account.
3. Login using your account.
4. Create, update, and delete tasks.
5. View task summaries in the dashboard.
6. Logout when finished.

---

## Development Challenges

This project was a valuable learning experience for me, especially because it was my first time building a full-stack application using a RESTful API approach.

One of the challenges I encountered was implementing RESTful APIs in an actual project. While I already had a basic understanding of what a RESTful API is, applying the concepts in a real application was a different experience. Through building the backend endpoints and connecting them with the frontend, I gradually gained a better understanding of how APIs work.

Another challenge was establishing communication between the frontend and backend. Initially, understanding how data flows between React and Express was confusing, but by testing requests, handling authentication, and integrating the different parts of the application, I was able to understand the process better.

Although there are still areas that I need to continue studying, completing this project gave me confidence and a better foundation in full-stack development. It was rewarding to see concepts that were unfamiliar at the beginning slowly become clearer as the application came together.

---

## Future Improvements

Possible improvements for future development:

- Task search and filtering
- Pagination
- Additional reporting features
- User profile management
- Improved task organization
