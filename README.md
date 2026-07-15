# HomeVista

A full-stack real estate web app for browsing, searching, and managing property listings for sale or rent.

**Live demo:** [homevista-vi9d.onrender.com](https://homevista-vi9d.onrender.com)  
**Repository:** [github.com/kashaf955/HomeVista](https://github.com/kashaf955/HomeVista)

---

## Features

- User authentication (email/password + Google OAuth via Firebase)
- Create, update, and delete property listings
- Search and filter by type, offer, parking, furnished, and sort order
- Listing detail pages with image carousel
- Home page with recent offers, rent, and sale listings
- Profile management
- image uploads (Firebase Storage)
- Responsive UI with Tailwind CSS

---

## Tech Stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React, Vite, Tailwind CSS, Redux Toolkit, React Router |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| Auth / Storage | Firebase Auth, Firebase Storage, JWT cookies |
| Deploy | Render |

---

## Project Structure

```
HomeVista/
├── api/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── client/              # React frontend
│   ├── src/
│   │   ├── Pages/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── assets/
│   │   └── firebase.js
│   └── package.json
├── package.json
└── .env                 # Server environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)
- Firebase project (Auth + Storage)

### 1. Clone the repo

```bash
git clone https://github.com/kashaf955/HomeVista.git
cd HomeVista
```

### 2. Install dependencies

```bash
npm install
npm install --prefix client
```

### 3. Environment variables

**Root `.env` (API):**

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**`client/.env` (Frontend):**

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### 4. Run locally

Start the API (port `3000`):

```bash
npm run dev
```

In another terminal, start the client (port `5173`):

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The Vite proxy forwards `/api` requests to the backend.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API with Nodemon |
| `npm start` | Start API in production mode |
| `npm run build` | Install deps and build the React client |
| `cd client && npm run dev` | Start Vite dev server |
| `cd client && npm run build` | Build client to `client/dist` |

---

## Deployment (Render)

1. Connect the GitHub repo to a Render **Web Service**.
2. Set:
   - **Build command:** `npm run build`
   - **Start command:** `npm start`
3. Add environment variables on Render:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `VITE_FIREBASE_API_KEY` *(must be available at **build** time)*
4. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**, add your Render domain (e.g. `homevista-vi9d.onrender.com`).

The Express server serves the built client from `client/dist` and handles client-side routing.

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register user |
| `POST` | `/api/auth/signin` | Sign in |
| `POST` | `/api/auth/google` | Google OAuth |
| `GET` | `/api/auth/signout` | Sign out |
| `POST` | `/api/listing/create` | Create listing |
| `GET` | `/api/listing/get` | Search / list listings |
| `GET` | `/api/listing/get/:id` | Get listing by ID |
| `POST` | `/api/listing/update/:id` | Update listing |
| `DELETE` | `/api/listing/delete/:id` | Delete listing |

---

## License

ISC
