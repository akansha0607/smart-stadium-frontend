# 🏟️ Smart Stadium Intelligence System

> AI-powered real-time crowd monitoring, queue optimization, and smart navigation platform for large venues like Arun Jyoti/Arun Jaitley Stadium.

---

## 🚀 Project Overview

Smart Stadium Intelligence System is a full-stack smart infrastructure solution built to improve stadium operations through:

* 📍 Real-time crowd density monitoring
* 🔥 Heatmap visualization of congestion zones
* 🍔 Queue tracking for food stalls and gates
* 🧭 Smart route optimization using Dijkstra’s Algorithm
* ☁️ Cloud deployment on Google Cloud Run
* 🤖 AI-ready architecture for predictive analytics

This project enhances visitor safety, operational efficiency, and crowd management for modern stadiums.

---

## 🌟 Features

### 🚶 Live Crowd Monitoring

* Dynamic zone density updates
* Color-coded crowd indicators:

  * 🟢 Low
  * 🟠 Medium
  * 🔴 High
* Live map integration using React Leaflet
* Heatmap support for congestion hotspots

### 🍔 Queue Management

* Track waiting times across food stalls/security gates
* Update people count and service times
* Optimize visitor flow

### 🧭 Smart Navigation

* Add stadium paths dynamically
* Find shortest route between zones
* Route drawn visually on stadium map
* Congestion-aware optimization potential

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* React Leaflet
* Leaflet Heatmap
* CSS

### Backend

* Java
* Spring Boot
* REST APIs
* Maven
* Dijkstra Algorithm

### Cloud & DevOps

* Docker
* Google Cloud Run
* Cloud Build
* GitHub

---

## 📂 Project Structure

```bash
smart-stadium-frontend/
 ┣ src/
 ┣ public/
 ┣ Dockerfile
 ┗ package.json

smart-stadium-backend/
 ┣ src/main/java/com/stadium/
 ┣ Dockerfile
 ┣ pom.xml
 ┗ application.properties
```

---

## 📡 API Endpoints

### Crowd Management

```http
POST /stadium/crowd?zone=A&density=120
GET /stadium/crowd
```

### Queue Management

```http
POST /stadium/queue?loc=Food1&people=30&serviceTime=5
GET /stadium/queue
```

### Navigation

```http
POST /stadium/path?from=A&to=B&weight=50
GET /stadium/route?src=A&dest=C
```

---

## 🐳 Deployment

### Backend

Deployed using:

* Dockerfile
* GitHub Repository
* Google Cloud Run

### Frontend

Deployed using:

* React production build
* Nginx container
* Dockerfile
* Google Cloud Run

---

## ▶️ Run Locally

### Backend

```bash
mvn spring-boot:run
```

### Frontend

```bash
npm install
npm start
```

---

## 📈 Future Enhancements

* 🤖 Gemini/OpenAI crowd prediction
* 🚨 Emergency evacuation suggestions
* 📊 Analytics dashboard
* 📱 Mobile responsiveness
* 🎥 CCTV-based density detection

---

## 🏆 Hackathon Value

### Problems Solved:

* Overcrowding
* Long queues
* Poor navigation
* Visitor safety concerns

### Solution Impact:

* Real-time monitoring
* Smarter routing
* Better operational control
* Scalable smart venue system

---

## 👩‍💻 Author

**Akansha Saxena**
Java Backend Developer | AI + Smart Infrastructure Builder

---

## ⭐ Final Note

Smart Stadium Intelligence System combines:

* Real-Time Systems
* Cloud Engineering
* AI Potential
* Full Stack Development

A strong hackathon-ready and portfolio-worthy project for modern smart venue management.
