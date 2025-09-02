# NoteSaver Project

This project consists of a client-side (React) and a backend (Node.js with Express and MongoDB) application for managing notes with OTP-based authentication.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Client Setup](#2-client-setup)
- [Environment Variables](#environment-variables)
  - [Backend](#backend)
  - [Email Configuration](#email-configuration)
- [Deployment](#deployment)
  - [Deploy Backend to Vercel](#deploy-backend-to-vercel)
  - [Deploy Client to Vercel](#deploy-client-to-vercel)
  - [Common Vercel Settings](#common-vercel-settings)
  - [Troubleshooting on Vercel](#troubleshooting-on-vercel)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with OTP verification
- Secure authentication using JWT stored in HTTP-only cookies
- Create, view, and manage notes
- Responsive UI for login, signup, and dashboard pages
- Styled with Tailwind CSS
- MongoDB for database storage
- Email sending for OTP verification

## Project Structure

```
noteSaver/
├── backend/                  # Node.js Express backend
│   ├── controller/           # API logic
│   │   ├── auth.controller.js
│   │   └── note.controller.js
│   ├── lib/                  # Utility functions (DB, OTP, JWT, Email)
│   │   ├── db.js
│   │   ├── getOTP.js
│   │   ├── sendEmail.js
│   │   └── utils.js          # Contains generateToken
│   ├── modals/               # Mongoose models
│   │   ├── note.modal.js
│   │   └── user.modal.js
│   ├── routes/               # API routes
│   │   ├── auth.route.js
│   │   └── note.route.js
│   ├── middleware/           # Authentication middleware
│   │   └── auth.middleware.js
│   ├── server.js             # Main server file
│   └── package.json
├── client/                   # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/            # Login, Signup, Dashboard
│   │   ├── routes/
│   │   ├── store/
│   │   └── ...
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js (LTS version recommended)
* npm or yarn
* MongoDB instance (local or cloud-hosted like MongoDB Atlas)

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create a `.env` file in the `backend` directory and configure your environment variables (see [Environment Variables](#environment-variables)).

4.  Start the backend server:
    ```bash
    node server.js
    # or if using nodemon (recommended for development)
    npm run dev
    ```
    The backend server will run on `http://localhost:<PORT>` where `<PORT>` is from your `.env`.

### 2. Client Setup

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create a `.env` file in the `client` directory if you need environment variables (e.g., API base URL):
    ```env
    VITE_BACKEND_URL=http://localhost:5000/api
    ```

4.  Start the client development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The client application will typically open at `http://localhost:5173`.

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory with the following variables:

* `PORT` (optional locally): Port for the backend server (e.g., `5000`). On Vercel, this is provided automatically.
* `MONGODB_URI`: Your MongoDB connection string (Atlas or local).
* `JWT_SECRET`: A strong secret key for JWT token signing.
* `FRONTEND_URL`: The URL of your deployed client (used in CORS), e.g., `http://localhost:5173` for local dev, or your Vercel client domain in production.

### Email Configuration

To enable OTP email functionality, add these to your `backend/.env` file:

* `EMAIL_USER`: Your Gmail address (e.g., `your_email@gmail.com`).
* `EMAIL_PASS`: Your Gmail App Password. Do not use your regular Gmail password. See Google docs for generating an App Password.

## Deployment

### Deploy Backend to Vercel

There are two key parts: point Vercel to the backend folder and provide env vars.

1. Push your repo to Git (GitHub, GitLab, or Bitbucket).
2. In Vercel, create a new project and import this repo.
3. Set the project’s Root Directory to `backend/`.
4. Ensure `backend/vercel.json` exists with:
    ```json
    {
      "version": 2,
      "builds": [{ "src": "server.js", "use": "@vercel/node" }],
      "routes": [{ "src": "/(.*)", "dest": "server.js" }]
    }
    ```
5. In Project Settings → Environment Variables, add:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `FRONTEND_URL` (your client URL)
6. Build/Output/Install settings for backend (if asked):
   - Build Command: leave empty
   - Output Directory: leave empty (or `.`)
   - Install Command: `npm install`
7. Deploy. Visit the deployment URL root `/` to see: `noteSaver Backend is running!`

### Deploy Client to Vercel

1. Create a separate Vercel project for the client.
2. Set the project’s Root Directory to `client/`.
3. Build settings (Vite defaults):
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. In Project Settings → Environment Variables, add (if used):
   - `VITE_BACKEND_URL` = your backend URL base, e.g. `https://<your-backend>.vercel.app/api`
5. Deploy. After deploy, update the backend’s `CORS` `FRONTEND_URL` to the client domain if needed.

### Common Vercel Settings

- Use separate projects for `backend/` and `client/` with their Root Directories set accordingly.
- Do not set `PORT` manually on Vercel; it is injected.
- `NODE_ENV` is set to `production` by Vercel in production deployments.

### Troubleshooting on Vercel

- `404: NOT_FOUND` on backend: ensure the project Root Directory is `backend/` and `vercel.json` targets `server.js`.
- CORS issues: set `FRONTEND_URL` to your client’s deployed URL and redeploy backend.
- Email errors (`Missing credentials for "PLAIN"`): verify `EMAIL_USER` and `EMAIL_PASS` (Gmail App Password) are set.

## API Endpoints

Main API endpoints:

**Authentication Routes (`/api/auth`)**

* `POST /api/auth/signup`: Register a new user and send OTP.
* `POST /api/auth/verify-otp`: Verify user's OTP.
* `POST /api/auth/login`: Login user with email and OTP.
* `POST /api/auth/resend-otp`: Resend OTP to user's email.
* `GET /api/auth/checkAuth`: Check if user is authenticated.

**Note Routes (`/api/note`)**

* `GET /api/note/` Get all notes for the authenticated user.
* `POST /api/note/add` Create a new note.
* `DELETE /api/note/delete` Delete a note by id (send `{ id }` in request body).

## Contributing

Contributions are welcome! Please follow standard practices for submitting pull requests.

## License

This project is licensed under the MIT License.

