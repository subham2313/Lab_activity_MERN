# Student Notes CRUD Micro-App

MERN Stack Lab Activity – Full-Stack Cloud Architectures

## Student Details

- Student Name: SUBHAM SARMA
- Student ID: 2026202006
- GitHub Repository:https://github.com/subham2313/Lab_activity_MERN.git

## Architecture

- Frontend: React + Vite + Axios
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Backend port: 5000
- Frontend port: 5173
- MongoDB database: `mongodb://localhost:27017/notes_db`

## Project Structure

```text
notes-app/
├── .gitignore
├── README.md
├── screenshots/
│   ├── ui-preview.png
│   └── delete-action.png
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── noteRoutes.js
│   ├── package.json
│   └── server.js
└── client/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

## Prerequisites

Install:

1. Node.js and npm
2. MongoDB Community Server, with the MongoDB service running

Check:

```bash
node --version
npm --version
mongosh
```

## 1. Start MongoDB

Make sure MongoDB is running locally.

The application connects to:

```text
mongodb://localhost:27017/notes_db
```

## 2. Install backend dependencies

Open a terminal:

```bash
cd notes-app/server
npm install
```

## 3. Start backend

```bash
npm start
```

Expected message:

```text
Server running on http://localhost:5000
MongoDB connected: mongodb://localhost:27017/notes_db
```

## 4. Install frontend dependencies

Open a second terminal:

```bash
cd notes-app/client
npm install
```

## 5. Start frontend

```bash
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

## REST API

### Create a note

```http
POST http://localhost:5000/api/notes
Content-Type: application/json
```

Body:

```json
{
  "title": "My first note",
  "content": "This is my first note."
}
```

Expected status: `201 Created`.

### Get all notes

```http
GET http://localhost:5000/api/notes
```

Notes are returned with newest `createdAt` first.

### Delete a note

```http
DELETE http://localhost:5000/api/notes/:id
```

Expected status: `200 OK` when the note exists and is deleted, or `404 Not Found` when it does not exist.

## Postman / curl smoke tests

Create:

```bash
curl -X POST http://localhost:5000/api/notes   -H "Content-Type: application/json"   -d '{"title":"Test Note","content":"Testing the POST endpoint"}'
```

Get:

```bash
curl http://localhost:5000/api/notes
```

Delete:

```bash
curl -X DELETE http://localhost:5000/api/notes/PASTE_NOTE_ID_HERE
```


