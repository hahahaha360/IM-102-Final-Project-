# IM-102-Final-Project-

# 🎬 Movie Record Management System

A full-stack CRUD web application built with **Node.js**, **Express**, **MySQL**, and a **web frontend** (HTML/CSS/JavaScript). This app allows users to manage a database of movie records through a user-friendly interface.

---

## 📌 Objective

This project was developed as part of the IM 102 Final Project to demonstrate full CRUD (Create, Read, Update, Delete) operations using a MySQL database and Node.js backend with a responsive frontend.

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MySQL

**Frontend:**
- HTML
- CSS
- JavaScript

---

## 🎯 Features

✅ View all movies  
✅ Add new movies  
✅ Edit existing movies  
✅ Delete movies  
✅ Real-time updates without refreshing the page  
✅ Web interface for all CRUD operations  

---

## 🎬 Movie Fields

| Field        | Type     |
|--------------|----------|
| `id`         | INT (Primary Key) |
| `title`      | VARCHAR |
| `director`   | VARCHAR |
| `release_year` | INT   |
| `rating`     | DECIMAL or VARCHAR |

---

## 🌐 REST API Endpoints

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/movies`        | Get all movies          |
| GET    | `/movies/:id`    | Get one movie by ID     |
| POST   | `/movies`        | Add a new movie         |
| PUT    | `/movies/:id`    | Update movie by ID      |
| DELETE | `/movies/:id`    | Delete movie by ID      |

---

## 🧪 How to start the Project

### 1. Clone the Repository
## 🛠️ Git Setup Guide (for Collaborators)

If you're working on this project, make sure Git is installed on your computer.

### 📥 Download Git (Latest Version)

👉 [Download Git for Windows, macOS, or Linux](https://git-scm.com/downloads)

This link will auto-detect your operating system.

---

### ✅ After Installing Git

Open your terminal or Git Bash and check the installed version:

```bash
git --version

## 👥 Team Git Workflow
# 1. Clone the project
git clone https://github.com/hahahaha360/IM-102-Final-Project-.git
cd IM-102-Final-Project-

# 2. Install dependencies (if Node.js is used)
npm install

# 3. Start coding! Make your changes...

# 4. Add and commit
git add .
git commit -m "Your message"

# 5. Push to GitHub
git push origin main - 	Sends your local commits to GitHub (or remote)
git pull origin main - 	Gets the latest changes from GitHub into your local code
