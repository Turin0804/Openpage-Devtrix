# OpenPage - Online Blogging Management System

A full-stack blogging platform built by **Team DevTrix** that provides a comprehensive solution for reading, writing, and managing blog articles with role-based access control. The system supports multiple user roles including readers, publishers, and administrators with distinct features for each.

## Live Demo

- **Frontend**: [https://getopenpage.web.app](https://getopenpage.web.app)
- **Backend API**: [https://openpage-server.vercel.app](https://openpage-server.vercel.app)

---

## Features

### User Features

- Browse and read articles from various publishers
- Advanced article search and filtering
- View trending and latest articles
- User profile management
- Subscription management and payment processing
- Rate and interact with articles
- Newsletter subscription

### Publisher Features

- Create, edit, and delete articles
- Manage article content and metadata
- View article statistics and analytics
- Monitor subscriber base
- Publish to the platform

### Admin Features

- Manage all users and their roles
- Moderate and manage articles
- Add new publishers to the platform
- View system-wide statistics and analytics
- User and content administration dashboard

---

## Tech Stack

### Frontend

- **React.js** — Modern UI framework for interactive user interfaces
- **Vite** — Fast build tool and development server
- **React Router DOM** — Client-side routing and navigation
- **Tailwind CSS** — Utility-first CSS framework for styling
- **Firebase** — Authentication and hosting services
- **Axios** — HTTP client for API communication
- **JavaScript ES6+** — Modern JavaScript features

### Backend

- **Node.js + Express** — REST API server
- **MongoDB** — NoSQL database for flexible data storage
- **JWT (JSON Web Tokens)** — Secure authentication mechanism
- **Cookie Parser** — HTTP cookie parsing middleware
- **CORS** — Cross-origin resource sharing for frontend communication
- **Vercel** — Cloud deployment platform

---

## Project Structure

```
Openpage-Devtrix/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configuration
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # Auth context
│   │   ├── api/           # API utilities
│   │   └── firebase/      # Firebase config
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Express backend
    ├── index.js
    ├── package.json
    └── vercel.json
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- MongoDB connection string (for backend)
- Firebase project credentials (for frontend)

### 1. Clone the Repository

```bash
git clone https://github.com/Turin0804/Openpage-Devtrix.git
cd Openpage-Devtrix
```

### 2. Setup Backend Server

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory with the following variables:

```env
PORT=9000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the server:

```bash
npm start
```

The backend API will be available at `http://localhost:9000`

### 3. Setup Frontend Client

Navigate to the client directory:

```bash
cd client
npm install
```

Create a `.env.local` file in the `/client` directory with Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Routes Overview

### Public Routes

| Route           | Description                   |
| --------------- | ----------------------------- |
| `/`             | Homepage with latest articles |
| `/articles`     | Browse all published articles |
| `/articles/:id` | View specific article details |
| `/login`        | User login page               |
| `/signup`       | New user registration page    |

### Private Routes (Authenticated Users)

| Route               | Description                    |
| ------------------- | ------------------------------ |
| `/add-article`      | Create a new article           |
| `/my-articles`      | View user's published articles |
| `/profile`          | User profile and settings      |
| `/subscription`     | Subscription and payment page  |
| `/premium-articles` | Access premium article content |

### Admin Routes (Admin Only)

| Route                   | Description                     |
| ----------------------- | ------------------------------- |
| `/dashboard`            | Admin dashboard with statistics |
| `/dashboard/articles`   | Manage all platform articles    |
| `/dashboard/users`      | Manage all users                |
| `/dashboard/statistics` | View platform statistics        |
| `/dashboard/publishers` | Add and manage publishers       |

---

## API Endpoints

The backend API provides the following main endpoints:

### Authentication

- `POST /api/auth/login` — User login
- `POST /api/auth/signup` — User registration
- `POST /api/auth/logout` — User logout

### Articles

- `GET /api/articles` — Get all articles with filtering
- `GET /api/articles/:id` — Get article details
- `POST /api/articles` — Create new article (authenticated)
- `PUT /api/articles/:id` — Update article (authenticated)
- `DELETE /api/articles/:id` — Delete article (authenticated)

### Users

- `GET /api/users` — Get all users (admin only)
- `GET /api/users/:id` — Get user details
- `PUT /api/users/:id` — Update user profile
- `DELETE /api/users/:id` — Delete user (admin only)

### Subscriptions

- `GET /api/subscriptions` — Get subscription plans
- `POST /api/subscriptions` — Create subscription
- `GET /api/subscriptions/:id` — Get subscription details

---

## Key Components

### Authentication

- **AuthContext**: Global authentication state management
- **useAuth Hook**: Custom hook for accessing authentication data
- **PrivateRoute**: Route protection for authenticated users
- **AdminRoute**: Route protection for admin users only

### Layout

- **MainLayout**: Default layout for public pages
- **DashboardLayout**: Layout for admin dashboard

### Components

- **Navbar**: Navigation header with user menu
- **Sidebar**: Dashboard navigation sidebar
- **Footer**: Application footer
- **Button**: Reusable button component
- **LoadingSpinner**: Loading state indicator
- **Card**: Reusable card component

---

## Available Scripts

### Client

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server

```bash
npm start        # Start server
npm run dev      # Start with nodemon (development)
```

---

## Environment Configuration

### Required Environment Variables

**Backend (.env)**:

- `PORT` — Server port (default: 9000)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret key for JWT signing
- `NODE_ENV` — Environment (development/production)

**Frontend (.env.local)**:

- `VITE_FIREBASE_*` — All Firebase configuration variables

---

## Deployment

### Frontend Deployment (Firebase Hosting)

The frontend is deployed on Firebase Hosting at [https://getopenpage.web.app](https://getopenpage.web.app)

```bash
firebase deploy
```

### Backend Deployment (Vercel)

The backend is deployed on Vercel at [https://openpage-server.vercel.app](https://openpage-server.vercel.app)

Deployment is automated through GitHub integration with Vercel.

---

## Development Workflow

1. Create a new branch for your feature:

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. Make your changes and commit:

    ```bash
    git add .
    git commit -m "Add your feature description"
    ```

3. Push to your branch:

    ```bash
    git push origin feature/your-feature-name
    ```

4. Open a Pull Request targeting the appropriate branch

---

## Troubleshooting

### Backend Issues

- Ensure MongoDB connection string is correct
- Verify JWT_SECRET is set in environment variables
- Check that server is running on the correct port

### Frontend Issues

- Clear browser cache and local storage
- Ensure Firebase credentials are properly configured
- Check that backend API URL is correct in API utility files
- Verify CORS settings on backend

---

## Team

**Team DevTrix** — Full-stack development team

---
