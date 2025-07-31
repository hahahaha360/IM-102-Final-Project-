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

## 🧪 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/hahahaha360/IM-102-Final-Project-.git
cd IM-102-Final-Project-
