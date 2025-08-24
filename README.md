# Task Manager
A production-ready Task Manager application where users can sign up, sign in, create, view, edit and delete personal tasks.

---

## How to Run

1. **Start Docker Engine** (Make sure Docker is running on your system)
2. **Start MySQL Database**  
  ```bat
   cd task-manager-be/src/db
   run-mysql.bat
   ```
3. **Run the backend (NestJS)**
  ```bat
  cd task-manager-be
  npm install
  npm run start:dev
  ```
4. **Run the Frontend (Vite + React)**
  ```bat
  cd task-manager-fe
  npm install
  npm run dev
  ```
5. **Open your browser and go to: http://localhost:5173**
