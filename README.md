# 🚗 Comprehensive Vehicle Data Management System

📦 Repository for Hcode intern task  
🎯 Objective: Manage vehicle data with import/export, CRUD, and real-time notification features.



## 🧰 Tech Stack

### 🖥️ Frontend
- ⚛️ React
- ⚡ Vite
- 🎨 CSS / Tailwind (optional styling)

### 🛠️ Backend
- 🟩 Node.js
- 🔮 GraphQL (Apollo Server)
- 🗄️ TypeORM (MySQL)
- 🧵 Bull.js (for batch processing)
- 🧱 Redis (Bull queue storage)
- 🔌 Socket.IO (real-time notifications)

### ⚙️ Architecture
- 🧩 Microservice-based design
- 🐳 Docker-ready (multi-container setup)


---
## 📁 Project Structure

```
hcode-intern-task-Dimagi/
├── ui-service/             # 🌐 React frontend 
├── api-service/            # 🚀 Node.js API (GraphQL + TypeORM)
├── batch-job-service/      # 🛠️ Bull.js batch jobs for import/export
```


## ⚙️ Features

- 📥 **Data Import** (CSV/Excel) with vehicle age calculation

- ✍️ **CRUD operations** using TypeORM

- 📃 **Paginated listing** 

- 🔍 **Wildcard search** by `car_model`

- 📤 **Data export** (e.g., cars older than 5 years)

- 🔔 **Real-time notifications** on batch job completion (WebSocket)

- 🖥️ **User-friendly React UI**

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/dimagisihilel/hcode-intern-task-Dimagi.git
cd hcode-intern-task-Dimagi
```

### 2. Install dependencies
Each service contains its own `package.json`. Install like so:

```bash
cd ui-service && npm install
cd ../api-service && npm install
cd ../batch-job-service && npm install
```

### 3. Start services
Make sure each service runs independently (without Docker):

```bash
# In separate terminals or tabs:
cd ui-service && npm run dev
cd ../api-service && npm run dev
cd ../batch-job-service && npm run dev
```

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

---
