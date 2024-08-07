# Blogging Full-Stack App with JWT Authentication

Welcome to the Blogging Full-Stack App with JWT Authentication! This project is a robust, secure, and scalable application that showcases the integration of a modern frontend with a powerful backend. The app leverages password encryption and JSON Web Tokens (JWT) for authentication, ensuring secure user sessions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication and Security](#authentication-and-security)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This full-stack application is designed to provide a seamless user experience with a responsive frontend and a secure, efficient backend. The application supports user authentication using JWT, ensuring that user data is protected and sessions are managed securely.

## Features

- **Full-Stack Development:** Complete integration of frontend and backend.
- **Secure Authentication:** Implements JWT for user authentication.
- **Password Encryption:** Ensures user passwords are stored securely.
- **API-Driven:** Robust APIs to handle various functionalities.
- **Scalable Architecture:** Designed to scale with increasing user demands.
- **Like Posts:** Users can like posts to show appreciation.
- **Post Creation:** Users can create new posts.
- **Edit Posts:** Users can edit their own posts.

## Technologies Used

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB (or any other database you used)
- JWT (JSON Web Tokens)
- Bcrypt for password hashing

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB setup (or any other database)

### Steps to Install

1. Clone the repository
    ```sh
    https://github.com/faisalkhandev/Blogging-Backend-and-Frontend..git
    ```
2. Navigate to the project directory
    ```sh
    cd server
    ```
3. Install backend dependencies
    ```sh
    cd server
    npm install
    ```
4. Install frontend dependencies
    ```sh
    cd frontend/authProject
    npm install
    ```
5. Configure environment variables in `.env` file for backend (e.g., database URI, JWT secret)

6. Run the backend server
    ```sh
    cd server
    nodemon app.js
    ```
7. Run the frontend development server
    ```sh
    cd frontend/authProject
    npm run dev
    ```


3. Open your browser and navigate to `http://localhost:3000`

### Screenshots

![LandingPage](https://github.com/user-attachments/assets/e46cde44-66ed-4581-9ebb-0825f3fd509b)
![Homepage](https://github.com/user-attachments/assets/51625cbf-6c74-4b43-8396-f680649ff3e3)
![resgister](https://github.com/user-attachments/assets/6224b526-0710-4f2c-be72-035a7ab60c3d)
![login](https://github.com/user-attachments/assets/03b9acf9-a015-41c3-987a-a97b19f0ab8b)


## API Documentation

### Authentication

- **POST /api/register**: Register a new user
- **POST /api/login**: Authenticate a user and return a JWT
- **GET /api/profile**: Get authenticated user details

### Example API Call

```sh
curl -X POST http://localhost:5000/api/auth/login \
-H 'Content-Type: application/json' \
-d '{"email":"abc1@gmail.com","password":"abc1"}'
