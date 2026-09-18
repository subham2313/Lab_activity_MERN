const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

// POST /api/notes
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
      return res.status(400).json({
        message: "Title and content are required."
      });
    }

    const note = new Note({
      title: title.trim(),
      content: content.trim()
    });

    const savedNote = await note.save();

    return res.status(201).json(savedNote);
  } catch (error) {
    console.error("POST /api/notes error:", error);
    return res.status(500).json({
      message: "Failed to create note."
    });
  }
});

// GET /api/notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("GET /api/notes error:", error);
    return res.status(500).json({
      message: "Failed to fetch notes."
    });
  }
});

// DELETE /api/notes/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Note not found."
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found."
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully.",
      deletedNote
    });
  } catch (error) {
    console.error("DELETE /api/notes/:id error:", error);
    return res.status(500).json({
      message: "Failed to delete note."
    });
  }
});

module.exports = router;
