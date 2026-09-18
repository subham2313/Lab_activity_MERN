const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/notes_db";

function connectDB() {
  return mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`MongoDB connected: ${MONGO_URI}`);
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      throw error;
    });
}

module.exports = connectDB;
