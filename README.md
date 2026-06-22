# Online Blogging Management System

A full-stack blogging platform built by **Team DevTrix** — allowing users to read, write, and manage blog articles with role-based access control.

---

## Tech Stack

### Frontend

- **React.js** — UI framework
- **React Router DOM** — Client-side routing
- **Bootstrap 5** — Styling & responsive layout

### Backend

- **Node.js + Express** — REST API server
- **MongoDB** — Database
- **JWT** — Authentication
- **Cookie Parser** — Cookie management
- **CORS** — Cross-origin requests

---

## Project Structure

```
├── client/          # React frontend
│   └── src/
│       ├── layouts/ # MainLayout, DashboardLayout
│       ├── pages/   # Home, Articles, Auth, Dashboard, etc.
│       └── routes/  # AppRoutes, PrivateRoute, AdminRoute
│
└── server/          # Express backend
    ├── index.js     # Entry point
    └── .env         # Environment variables
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Turin0804/Online-Blogging-Management-System-DevTrix-.git
cd Online-Blogging-Management-System-DevTrix-
```

### 2. Setup Server

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=9000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

### 3. Setup Client

```bash
cd client
npm install
npm run dev
```

---

## Routes Overview

| Route           | Access     | Description       |
| --------------- | ---------- | ----------------- |
| `/`             | Public     | Homepage          |
| `/articles`     | Public     | All articles      |
| `/articles/:id` | Public     | Article details   |
| `/add-article`  | Private    | Add new article   |
| `/subscription` | Private    | Subscription page |
| `/profile`      | Private    | User profile      |
| `/my-articles`  | Private    | My articles       |
| `/dashboard`    | Admin only | Admin dashboard   |
| `/login`        | Public     | Login page        |
| `/signup`       | Public     | Register page     |

---

## Branch Workflow

1. Work on your **own branch**
2. Push changes: `git push origin <YourBranch>`
3. Open a **Pull Request** → target: `Develop`
4. Wait for review & merge

---

> © 2026 DevTrix Team. All rights reserved.
