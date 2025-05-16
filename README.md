# 📋 Task Distributor Project

A web-based task management system where an **Admin** uploads a CSV file containing tasks and assigns them to selected **Members** (Agents). Tasks are automatically and evenly distributed among members.

---

## 🚀 Features

### 🔐 Authentication

- **Admin Registration & Login**
  - Fields: `name`, `email`, `password`
  - Passwords hashed using `bcrypt`
  - Email validated using `validator`
  - JWT tokens for session management

- **Member Login**
  - Fields: `name`, `phone`, `email`, `password`
  - Passwords hashed using `bcrypt`
  - Email validated using `validator`
  - JWT tokens for secure login

---

## 📁 Admin Dashboard

- **Upload CSV File**
  - Upload a CSV file with tasks
  - CSV is parsed in backend
  - Header row is ignored
  - Tasks are distributed evenly among selected members
  - Extra (remaining) tasks are given starting from the first member

- **Create New Tasks**
  - Admin can create tasks manually via UI

- **View All Tasks**
  - Admin can see all distributed tasks

- **Download CSV**
  - Admin can download the original CSV file or task summary

---

## 👤 Member Dashboard

- **View Assigned Tasks**
  - Each member sees only their assigned tasks

- **Download CSV**
  - Members can download a CSV of their own tasks

---

## 🧠 How Task Distribution Works

1. Admin uploads a CSV file (e.g., rows of tasks).
2. Backend removes the header row and counts the total lines.
3. Tasks are distributed equally to selected members.
4. If tasks can't be equally divided, the remaining tasks are distributed one-by-one from the top of the member list.

---

## 🛠️ Tech Stack

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** with Mongoose ODM
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Secure token generation
- **validator** – Email validation
- **csv-parser / fs** – To handle CSV files

### Frontend:
- **React** (with **Vite** for fast builds)
- **Tailwind CSS** – Styling
- **React Router DOM** – Routing
- **Axios** – API communication
- **React Toastify** – User-friendly notifications

---

## 📂 Folder Structure (Suggested)

