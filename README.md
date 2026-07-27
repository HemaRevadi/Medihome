# 🌿 Medihome — Full-Stack Home Remedies Search Platform

Medihome is a responsive, full-stack web application designed to help users quickly discover and filter categorized home remedies for common health issues. Built with a React frontend, Flask backend REST API, and MongoDB database, the platform offers real-time client-side search and dynamic data retrieval.

---

## 🚀 Features

- 🔍 **Real-Time Search & Filtering:** Fast client-side keyword search across remedy categories, ingredients, and health conditions.
- ⚡ **RESTful API Backend:** Flask REST APIs handling seamless data querying from MongoDB with CORS support enabled[cite: 1, 2].
- 📱 **Responsive UI:** Clean, intuitive interface built with React for high performance across desktop and mobile devices[cite: 1, 2].
- 📂 **Categorized Data Structure:** Dynamic rendering of remedies categorized by symptoms, remedies, and usage instructions[cite: 1, 2].

---

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)[cite: 1, 2]
- **Backend:** Python, Flask, Flask-CORS[cite: 1, 2]
- **Database:** MongoDB[cite: 1, 2]
- **API & Tools:** REST APIs, Git, GitHub, Postman[cite: 1, 2]

---
## Quick Start & Setup Prerequisites
Make sure you have the following installed:
Node.js (v14+)
Python 3.x
MongoDB running locally or a MongoDB Atlas connection string1. 

## Backend Setup (Flask)Bash# Navigate to the server folder
cd server
python -m venv venv
venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
python app.py

## 2. Frontend Setup (React)Bash
cd client
npm install
npm start
The app will open automatically at http://localhost:3000
