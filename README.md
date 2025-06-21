# Workshop Schedule Application

A full-stack application for managing workshop schedules built with React, Node.js, MongoDB, and TailwindCSS.

## Features

- Create, read, update, and delete workshops
- View workshop details including date, time, location, and instructor
- Track workshop capacity and enrolled participants
- Modern and responsive UI with TailwindCSS
- RESTful API backend

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn package manager

## Project Structure

```
workshop-schedule/
├── client/             # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── server/             # Node.js backend
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── index.js
    └── package.json
```

## Setup Instructions

1. Clone the repository

2. Setup Backend
```bash
cd server
npm install
```

3. Setup Frontend
```bash
cd client
npm install
```

4. Create a `.env` file in the server directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workshop-schedule
NODE_ENV=development
```

## Running the Application

1. Start MongoDB server

2. Start the backend server:
```bash
cd server
npm run dev
```

3. Start the frontend development server:
```bash
cd client
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/workshops` - Get all workshops
- `GET /api/workshops/:id` - Get a specific workshop
- `POST /api/workshops` - Create a new workshop
- `PATCH /api/workshops/:id` - Update a workshop
- `DELETE /api/workshops/:id` - Delete a workshop

## Technologies Used

- Frontend:
  - React
  - React Router
  - TailwindCSS
  - Axios
  - date-fns
  - Heroicons

- Backend:
  - Node.js
  - Express
  - MongoDB with Mongoose
  - CORS
  - dotenv

## License

MIT