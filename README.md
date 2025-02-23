### **Task Management Application**

A simple **Task Management** application built with **React + TypeScript (frontend)**, **Node.js (backend)**, and **PostgreSQL (database)**.

---

## **Steps to Set Up the Database**
This project uses **PostgreSQL** as the database. Below are the steps to set it up:

### **Install PostgreSQL**
- If you don’t have PostgreSQL installed, download it from: [PostgreSQL Official Site](https://www.postgresql.org/download/)
- Start the PostgreSQL service.

### **Create the Database**
Run the following command in the PostgreSQL shell:
```sql
CREATE DATABASE task_manager;
```

### **Create Tables**
After cloning the repository, navigate to the backend folder and run migrations:
```sh
cd backend
npm run migrate
```

Alternatively, you can manually create the tables:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status BOOLEAN DEFAULT false,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

### **Environment Variables**
Create a `.env` file in the **backend** directory:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=********
DB_NAME=task_manager
JWT_SECRET=your_secret_key
```

## **How to Run the Backend**
### **Install Dependencies**
```sh
cd backend
npm install
```

### **Start the Server**
```sh
npm run dev
```

The backend should now be running on **http://localhost:3000**.

---

## **How to Run the Frontend**
### **Install Dependencies**
```sh
cd frontend
npm install
```

### **Set Up Environment Variables**
Create a `.env` file in the **frontend** directory:
```
REACT_APP_API_URL=http://localhost:3000
PORT=5000
```

### **Start the Frontend**
```sh
npm start
```
The frontend should now be running on **http://localhost:5000**.

---

## **Testing Notes**
- **Postman** can be used for API testing.
- Example API calls:
  - **Register a user**:  
    `POST /auth/register`  
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```
  - **Login a user**:  
    `POST /auth/login`  
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```
  - **Create a task**:  
    `POST /tasks`  
    ```json
    {
      "title": "Complete project",
      "description": "Finish the coding challenge"
    }
    ```
  - **Update a task**:  
    `PUT /tasks/:id`  
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description",
      "status": true
    }
    ```
  - **Delete a task**:  
    `DELETE /tasks/:id`

---

## **Salary Expectations per Month (Mandatory)**
**Salary Expectation: $3200/month**  

---

## **Short Video Demo**
A video demonstrating the app’s functionality can be found at:  
👉 [Demo](./Lumaa_FullStackCodingChallenge.mp4)

### **Demo Includes:**
✅ Registering a user  
✅ Logging in  
✅ Creating a task  
✅ Updating a task (title, description, status)  
✅ Deleting a task  

---



