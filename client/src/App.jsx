import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all notes when the component is mounted.
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);
        setNotes(response.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load notes. Make sure the backend and MongoDB are running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Create a new note.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please enter both a title and content.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await axios.post(API_URL, {
        title: title.trim(),
        content: content.trim()
      });

      // Add the newly-created note to the beginning of the list.
      setNotes((previousNotes) => [response.data, ...previousNotes]);

      // Clear controlled inputs.
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to create note:", err);
      setError(
        err.response?.data?.message || "Unable to create the note."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a note and synchronize local React state.
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      setError("");

      await axios.delete(`${API_URL}/${id}`);

      // Remove the deleted note without refreshing the browser.
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError(
        err.response?.data?.message || "Unable to delete the note."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">MERN STACK LAB</p>
          <h1>Student Notes</h1>
          <p className="subtitle">
            Create, view and delete notes with React, Express and MongoDB.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="form-card">
          <h2>Add a Note</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={submitting}
            />

            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Write your note here..."
              rows="5"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              disabled={submitting}
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Add Note"}
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </section>

        <section className="notes-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR NOTES</p>
              <h2>All Notes</h2>
            </div>
            <span className="count">{notes.length}</span>
          </div>

          {loading ? (
            <div className="state-card">
              <div className="spinner"></div>
              <p>Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="state-card">
              <p>No notes yet — add one above!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <article className="note-card" key={note._id}>
                  <div className="note-card-top">
                    <h3>{note.title}</h3>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(note._id)}
                      disabled={deletingId === note._id}
                    >
                      {deletingId === note._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>

                  <p className="note-content">{note.content}</p>

                  <time dateTime={note.createdAt}>
                    {new Date(note.createdAt).toLocaleString()}
                  </time>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
