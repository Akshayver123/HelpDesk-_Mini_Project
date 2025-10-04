# HelpDesk Mini (Tickets + SLA + Comments)

Minimal full-stack helpdesk app.

## Stack
- Backend: Node.js, Express, SQLite, JWT
- Frontend: Vite + React + Tailwind

## Setup (Windows)

### Backend
1. Create env file:
   - Copy `backend/.env.example` to `backend/.env` and set `JWT_SECRET`.
2. Install deps and init DB:
   ```powershell
   npm install --prefix backend
   npm run init:db --prefix backend
   npm run dev --prefix backend
   ```
   API at http://localhost:4000

### Frontend
1. Install deps and run dev:
   ```powershell
   npm install --prefix frontend
   npm run dev --prefix frontend
   ```
   App at http://localhost:5173

## Features
- Register/Login
- CRUD Tickets with SLA due date
- Comments per ticket

## Notes
- Vite proxy forwards `/api` to backend.
- SQLite DB file at `backend/data.sqlite`.
