# Google Books Search Engine

This is a full-stack application that allows users to search for books using the Google Books API and save their favorite books. The application is built with React on the client side and Node.js with Express and Apollo Server on the server side.

## Deployed application
https://book-search-engine-h13j.onrender.com

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/google-books-search-engine.git
    cd google-books-search-engine/Develop
    ```

2. Install dependencies for both client and server:
    ```sh
    npm run install
    ```

3. Create a `.env` file in the `server` directory and add your MongoDB URI and JWT secret key:
    ```properties
    MONGODB_URI='mongodb://127.0.0.1:27017/googlebooks'
    JWT_SECRET_KEY='shh'
    ```

## Usage

1. Start the development server:
    ```sh
    npm run start:dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Technologies

- **Client:**
  - React
  - Apollo Client
  - React Router
  - Bootstrap

- **Server:**
  - Node.js
  - Express
  - Apollo Server
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT)

## Contributors
Tavin Sowell

GitHub: https://github.com/Tavinsowell
