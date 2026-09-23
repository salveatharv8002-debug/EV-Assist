EV Assist Full Project

Pages included:
1. Login / Register
2. Home
3. Charging Stations + search/map UI
4. Charging Station Details
5. Battery Assistance
6. Mechanic Support
7. Profile

Backend included:
- Node.js + Express
- MongoDB + Mongoose
- JWT login
- Password hashing with bcrypt
- Assistance request API

IMPORTANT:
Copy your existing image33.png into:
frontend/public/image33.png

Then:
FRONTEND:
cd frontend
npm install
npm run dev
Open http://localhost:5174

BACKEND in a second terminal:
cd backend
npm install
copy .env.example .env
npm run dev

For Windows PowerShell, if "npm.ps1 cannot be loaded" appears, use:
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
