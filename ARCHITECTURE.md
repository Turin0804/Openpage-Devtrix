# OpenPage - Project Documentation

## 1. Project Overview & Purpose
**OpenPage** is a comprehensive, full-stack online blogging and publication management system developed by Team DevTrix. The platform provides a centralized environment where users can read, write, and manage articles. It operates on a model similar to popular publishing platforms like Medium, integrating free content consumption with a premium subscription model for exclusive articles.

The core problem OpenPage solves is the lack of structured, role-based access control (RBAC) in simple blogging templates. It introduces a hierarchical system that clearly separates the capabilities of general readers, content publishers, and platform administrators, ensuring a secure and scalable content delivery ecosystem.

### Core User Roles
* **Readers/Users:** The standard role. Users can browse the platform, search for articles, read free content, interact with articles (like and comment), and upgrade their accounts via Stripe to access premium content.
* **Publishers:** The content creators. Publishers have access to a specialized dashboard where they can create, format, and edit their articles, as well as track their content's engagement and view counts.
* **Administrators:** The platform moderators. Admins have overarching control over the platform. They can approve or reject pending articles, manage user roles, onboard new publishers, and view platform-wide analytics and statistics.

---

## 2. Architecture & Technology Stack
The project is built on a modern JavaScript architecture, heavily influenced by the **MERN stack** (MongoDB, Express, React, Node.js), but tailored with specific modern tools for better performance and security.

### Frontend (Client-Side)
* **Core Library:** React.js (v18)
* **Build Tool:** Vite (Chosen for significantly faster HMR and optimized builds compared to CRA).
* **Routing:** React Router DOM (v7) for handling SPA (Single Page Application) navigation and protecting private routes.
* **State & Data Fetching:** React Query (`@tanstack/react-query`) handles server state, caching, and data synchronization, minimizing redundant API calls. The Context API is utilized strictly for global authentication state (`AuthContext`).
* **Styling:** Tailwind CSS and DaisyUI provide a utility-first, rapid UI development workflow. Headless UI is used for accessible interactive components.
* **Authentication UI:** Firebase SDK is used to handle the heavy lifting of user login flows (Google OAuth, Email/Password).

### Backend (Server-Side)
* **Framework:** Node.js with Express.js.
* **Authentication Security:** Custom JSON Web Tokens (JWT) working alongside Firebase.
* **Payment Gateway:** Stripe backend SDK handles secure payment intents for subscriptions.
* **Email Services:** Nodemailer is configured for system-generated email communications.

### Database
* **Database:** MongoDB Atlas (NoSQL).
* **Driver:** The project uses the native `mongodb` Node.js driver rather than an ODM like Mongoose, allowing for direct, performant database queries and flexible schema management.

### Deployment & Infrastructure
* **Frontend Hosting:** Firebase Hosting.
* **Backend Hosting:** Vercel (Serverless environment).

---

## 3. Frontend Architecture Deep Dive
The frontend application, located in the `/client` directory, is designed to be highly responsive and interactive.

### Routing & Protection Strategy
Routing is handled client-side. To enforce Role-Based Access Control, custom route wrappers are implemented:
* **`<PrivateRoute>`:** Checks the `AuthContext` to ensure a user is logged in before allowing access to pages like Profile, Subscriptions, or Premium Articles.
* **`<AdminRoute>`:** A stricter wrapper that fetches the user's role from the backend and ensures they are explicitly marked as an "admin" before granting access to dashboard routes.

### UI & User Experience (UX)
The UI is styled primarily with Tailwind CSS. To enhance the user experience, several specialized libraries are integrated:
* `aos` (Animate On Scroll) for smooth reveal animations as users scroll through articles.
* `swiper` for touch-responsive image and article carousels.
* `react-google-charts` used in the Admin dashboard to visualize platform statistics (total users, premium vs. normal users).
* `react-hot-toast` for non-intrusive global notification popups (e.g., "Article successfully published", "Payment successful").

---

## 4. Backend Architecture Deep Dive
The server, located in the `/server` directory, acts as a RESTful API bridging the React frontend and the MongoDB database.

### API Security & Authentication Flow
A critical component of the backend is how it secures endpoints. It uses a dual-layer authentication strategy:
1. **Initial Login:** The frontend authenticates the user via Firebase.
2. **Token Generation:** The frontend immediately sends the user's email to the backend (`POST /jwt`). The backend signs a JWT using `jsonwebtoken` and an `ACCESS_TOKEN_SECRET`.
3. **Cookie Storage:** The JWT is returned to the client and stored as an **HTTP-only cookie**. This is a crucial security measure as HTTP-only cookies cannot be accessed via frontend JavaScript, mitigating Cross-Site Scripting (XSS) attacks.
4. **Endpoint Protection:** For protected routes (e.g., `PATCH /users/role/:email`), the `verifyToken` middleware intercepts the request, reads the HTTP-only cookie, and verifies the signature before allowing the controller logic to execute.

### Serverless Database Connection Handling
Because the backend is deployed on Vercel, it operates in a "Serverless" environment. This means the server spins up and shuts down dynamically based on traffic. 
To prevent database connection drops ("cold starts"), a custom middleware named `requireDb` is implemented. Before executing any database operation, this middleware checks if the MongoDB connection pool is active in memory. If not, it pauses the request, establishes a fresh connection to MongoDB Atlas, and then proceeds, ensuring high reliability.

---

## 5. Database Schema & Collections
The MongoDB database relies on flexible document structures. The primary collections are:

1. **`users` Collection:**
   Stores user profiles. When a user logs in for the first time, a document is created containing their `email`, `role` (default: "user"), `userHasSubscription` (boolean), and `premiumTaken` (timeframe). 
2. **`articles` Collection:**
   The core content collection. It stores the `title`, `description`, `author` details, `status` (pending/approved), `isPremium` (boolean), and a `viewCount` integer. Notably, interactions like likes and comments are stored as embedded arrays within the article document (e.g., `likes: ["user1@email.com"]`), leveraging MongoDB's NoSQL nature to avoid complex SQL JOIN operations.
3. **`publishers` Collection:**
   Maintains a registry of users who have been approved by admins to publish content on the platform.
4. **`subscriptions` Collection:**
   Handles the configurations for available premium plans.

---

## 6. Core System Workflows

### The Content Publishing Workflow
1. A user with the "Publisher" role fills out the article creation form on the frontend.
2. The frontend sends a `POST` request to `/articles`. The backend saves the document in the database with a default status of `pending`.
3. The article is not yet visible to the public. An Administrator logs into the dashboard and navigates to the article management view.
4. The Admin reviews the content and clicks "Approve". The frontend triggers a `PATCH` request to `/articles/:id`, updating the status to `approved`.
5. The article instantly becomes queryable on the public `/approved-articles` endpoint.

### The Premium Subscription Workflow
1. A standard user attempts to view a premium article but is prompted to subscribe.
2. The user navigates to the subscription page, which renders a Stripe payment element securely securely loaded via `@stripe/react-stripe-js`.
3. Upon entering valid payment details, the frontend processes the transaction.
4. Upon Stripe's success confirmation, the frontend triggers `POST /update-subscription`.
5. The backend locates the user in the `users` collection and updates `userHasSubscription` to `true`.
6. The user is now authorized to hit the `/premium-articles` endpoint and read exclusive content.
