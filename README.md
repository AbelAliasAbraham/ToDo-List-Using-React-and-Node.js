# ToDo-List-Using-React-and-Node.js

This project is a full-stack Todo list application built using the MERN (MongoDB, Express, React, Node.js) stack. It features user authentication (login/registration) and personal, user-scoped CRUD operations (Create, Read, Update, Delete) for managing tasks.

---

## 💡 Key Features

* **User Authentication:** Secure registration and login using **JWT** (JSON Web Tokens).
* **Secure Task Management:** Todos are scoped to the authenticated user's ID.
* **CRUD Operations:** Functionality to add, list, toggle completion status, edit, and delete tasks.
* **Client-Side Routing:** Simple view management using React state to switch between Home, Auth, and Todo List screens.
* **Styling:** Clean, modern interface using custom CSS.

---

## 🛠️ Project Structure and Dependencies

### 1. Backend (Server) Setup

The backend is an Express server responsible for API routing, database interaction, and authentication.

| File/Directory | Description |
| :--- | :--- |
| `index.js` | Main entry point; handles MongoDB connection, CORS, and routing setup. |
| `routes/auth.js` | Handles user registration and login endpoints. |
| `routes/todos.js` | Handles CRUD operations for todo items, restricted by user authentication. |
| `models/User.js` | Mongoose schema for the User model. |
| `models/Todo.js` | Mongoose schema for the Todo model. |
| `middleware/authMiddleware.js` | Middleware to verify JWT and attach user ID to the request object. |
| `.env` | Stores sensitive variables like `MONGO_URI` and `SECRET_KEY`. |

#### Server Dependencies

| Dependency | Purpose |
| :--- | :--- |
| **`express`** | The web application framework. |
| **`mongoose`** | MongoDB object modeling for Node.js. |
| **`dotenv`** | To load environment variables from a `.env` file. |
| **`cors`** | To enable Cross-Origin Resource Sharing. |
| **`jsonwebtoken`** | For creating and verifying JSON Web Tokens. |
| **`bcryptjs`** | For hashing user passwords securely. |

---

### 2. Frontend (Client) Setup

The frontend is a React application that manages the UI and communicates with the backend API via HTTP requests.

| File/Directory | Description |
| :--- | :--- |
| `main.jsx` | Renders the main React `<App />` component. |
| `App.jsx` | Main component managing state, authentication, API calls, and view rendering. |
| `Home.jsx` | Simple landing page. |
| `Auth.jsx` | Component for user sign-in/registration. |
| `TodoList.jsx` | Component for displaying and managing the list of tasks. |
| `style.css` | Global styling for the application. |

#### Client Dependencies

| Dependency | Purpose |
| :--- | :--- |
| **`react`** | The core library for building the user interface. |
| **`react-dom`** | Entry point for rendering React to the DOM. |
| **`axios`** | Promise-based HTTP client for making API requests to the server. |

---

## 🚀 Getting Started

You will need **Node.js** and **MongoDB** installed and running locally.

### 1. Backend (Server) Setup

1.  **Navigate** to the server directory:
    ```bash
    cd <server-directory-name>
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  Create a **`.env`** file with your configuration:
    ```
    MONGO_URI=mongodb://localhost:27017/practice
    SECRET_KEY=mySuperSecretKey
    ```
4.  **Start the Server:** The API will run on `http://localhost:5000`.
    ```bash
    node index.js
    ```

### 2. Frontend (Client) Setup

1.  **Navigate** to the client directory:
    ```bash
    cd <client-directory-name>
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Client:** The application will typically open in your browser on a port like `http://localhost:3000`.
    ```bash
    npm run dev
    ```
