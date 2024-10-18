# Animal Adoption

This is a full-stack animal adoption application built with React, TypeScript, Redux, and Vite on the frontend, and Node.js, Express, and PostgreSQL on the backend.
<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/user-attachments/assets/ff463ed4-ee82-4f05-9fa1-6731a4704ae2" width="400" alt="First image">
    <img src="https://github.com/user-attachments/assets/e311a535-c835-4365-ad86-98af9d93931a" width="400" alt="Second image">
</div>

## Features

* **User Management:** Users can register, log in, and manage their posted animals.
* **Animal Listings:** Users can upload animals available for adoption, including images and details.
* **Animations:** Smooth UI animations powered by `@react-spring/web`.
* **Markdown Support:** Use of a markdown editor for rich-text content with sanitation for security.
* **Routing:** Dynamic routing for navigating between pages using `react-router-dom`.
* **State Management:** Efficient global state management with `@reduxjs/toolkit`.
* **Form Handling:** Axios is used for form submissions and API interactions.
* **File Uploads:** Handle image uploads using Multer.
* **Input Validation:** Express-validator for request validation.
* **Authentication:** Secure JWT-based authentication with bcrypt for password hashing.
* **Responsive Design:** Styled with TailwindCSS for a mobile-friendly and responsive design.

## Tech Stack

### Frontend
* **React**, **TypeScript**, **Vite**
* **Redux** for state management
* **React Router** for routing
* **TailwindCSS** for styling
* **Axios** for HTTP requests
* **@react-spring/web** for animations
* **Markdown Support:** `react-md-editor` and `react-markdown`

### Backend
* **Node.js**, **Express**, **TypeScript**
* **PostgreSQL** database
* **JWT Authentication** with `jsonwebtoken` and `bcrypt`
* **File Uploads** with Multer
* **Validation** using express-validator
* **Testing** setup with Jest, Supertest, and pg-mem for database testing

## Getting Started

### Prerequisites
Ensure you have the following installed:
* Node.js (version 14+)
* PostgreSQL

### Installation
1. Clone the repository:
```bash
git clone https://github.com/paluras/adoptProject.git
```

2. Navigate to the project directory:
```bash
cd animal-adoption
```

3. Install frontend and backend dependencies:
```bash
cd frontend/animal-adoption
npm install

cd backend
npm install
```

4. Set up environment variables for both the frontend and backend. Copy `.env.example` to `.env` and configure the database and API credentials.

### Running the Frontend
* Start the development server:
```bash
npm run dev
```

* Build for production:
```bash
npm run build
```

* Preview the production build locally:
```bash
npm run preview
```

### Running the Backend
* Start the development server with Nodemon:
```bash
npm run dev
```

* Start the production server:
```bash
npm start
```

### Running Tests
For the backend, run the test suite with Jest:
```bash
npm test
```

To watch for file changes and re-run tests:
```bash
npm run test:watch
```

## Folder Structure

### Frontend
* **src/:** Contains the React components, Redux store, and other frontend logic.
* **public/:** Static assets and HTML file for the frontend.

### Backend
* **src/server.ts:** Entry point for the backend server.
* **src/controllers/:** Business logic for API routes.
* **src/routes/:** Defines all API routes.
* **src/middleware/:** Custom middleware (authentication, error handling, etc.).
* **src/models/:** Contains database models and interactions.

## Contributing
Feel free to open issues or pull requests. Contributions are welcome!

## License
This project is licensed under the ISC License.
