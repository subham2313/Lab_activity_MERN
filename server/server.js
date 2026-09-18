const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = 5000;

// Middleware must be mounted before the routes.
app.use(cors());
app.use(express.json());

// REST API routes.
app.use("/api/notes", noteRoutes);

// Simple health-check route.
app.get("/", (req, res) => {
  res.json({
    message: "Student Notes CRUD API is running."
  });
});

// Start only after MongoDB connection succeeds.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.error("Server was not started because MongoDB is unavailable.");
    process.exit(1);
  });
