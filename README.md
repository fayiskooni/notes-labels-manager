# Notes and Labels Manager

A full-stack application for managing notes with a flexible labeling (tagging) system. This project allows users to create, view, and organize notes and filter them based on their associated labels.

## Tech Stack
**Frontend:** Next.js (App Router), React, TailwindCSS, TypeScript
**Backend:** Node.js, Express, PostgreSQL (`pg`), TypeScript

## Database Setup
1. Create a PostgreSQL database (e.g., `notesManager`).
2. Run the initialization script to set up the schema. From the `backend` folder, you can run:
   ```bash
   psql -U your_postgres_user -d notesManager -f init.sql
   ```
   Alternatively, copy the contents of `backend/init.sql` and run it in your preferred database client (e.g., pgAdmin, DBeaver) to create the tables natively.

## Environment Variables
You need to set up environment variables for both the backend and frontend.

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory using the provided `.env.example`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/notesManager"
PORT=5001
```

### Frontend (`frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory using the `.env.local.example`:
```
NEXT_PUBLIC_API_URL="http://localhost:5001"
```

## Running the Application

### 1. Start the Backend API
```bash
cd backend
npm install
npm run dev
```
The API server will run on `http://localhost:5001` (or whichever port you specified in `.env`).

### 2. Start the Frontend Next.js App
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The Next.js development server will start at `http://localhost:3000`.

## Features
- Create, view and delete notes.
- Create, view, update and delete labels.
- Associate multiple labels to any single note (Many-to-Many).
- Efficient label-based filtering to find precise notes using assigned tags.
