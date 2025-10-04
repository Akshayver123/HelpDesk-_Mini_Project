# 🚀 How to Run HelpDesk Mini

## ✅ Both servers are NOW RUNNING!

### 🔗 Access URLs:

- **Frontend (React App)**: http://localhost:5173
- **Backend (API Server)**: http://localhost:4000

---

## 📋 Commands Used (For Future Reference)

### Backend Setup (One-time):
```powershell
cd d:\HelpDesk_Mini\backend
npm install
npm run prisma:generate
npm run prisma:migrate
```

### Start Backend Server:
```powershell
cd d:\HelpDesk_Mini\backend
npm run dev
```
✅ Backend runs at: **http://localhost:4000**

---

### Frontend Setup (One-time):
```powershell
cd d:\HelpDesk_Mini\frontend
npm install
```

### Start Frontend Server:
```powershell
cd d:\HelpDesk_Mini\frontend
npm run dev
```
✅ Frontend runs at: **http://localhost:5173**

---

## 🎯 Test Accounts (Already Seeded)

- **Admin**: `admin@helpdesk.com` / `admin123`
- **User**: `user@helpdesk.com` / `user123`

---

## 🛠️ Other Useful Commands

### View Database in GUI:
```powershell
cd d:\HelpDesk_Mini\backend
npm run prisma:studio
```
Opens at: http://localhost:5555

### Reset Database:
```powershell
cd d:\HelpDesk_Mini\backend
# Delete the database file
Remove-Item prisma\dev.db
# Re-run migrations and seed
npm run prisma:migrate
```

---

## ⚠️ Common Mistakes

❌ **WRONG**: `npm dev run`  
✅ **CORRECT**: `npm run dev`

❌ **WRONG**: Running only one server  
✅ **CORRECT**: Keep BOTH backend AND frontend running in separate terminals

---

## 🔄 SLA Checker

The backend automatically runs an SLA checker **every hour** that marks overdue tickets as "overdue" status.

---

## 📁 Project Structure

```
HelpDesk_Mini/
├── backend/          → Express + Prisma + SQLite
│   ├── prisma/       → Database schema & migrations
│   ├── src/
│   │   ├── routes/   → API endpoints
│   │   ├── middleware/ → Auth guards
│   │   └── utils/    → SLA checker
│   └── .env          → Config (JWT_SECRET, etc.)
│
└── frontend/         → Vite + React + Tailwind
    └── src/
        ├── pages/    → Dashboard, TicketDetail, Login, Register
        ├── components/ → TicketCard, CommentBox, NavBar
        └── services/ → API helpers
```
