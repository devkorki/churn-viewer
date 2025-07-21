import React, { useState } from "react";

const ClientNotes = ({ clientId }) => {
  const localKey = `client_notes_${clientId}`;
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(localKey);
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddNote = () => {
    if (note.trim() === "") return;
    const newNotes = [...notes, { text: note, date: new Date().toLocaleString() }];
    setNotes(newNotes);
    localStorage.setItem(localKey, JSON.stringify(newNotes));
    setNote("");
  };

  return (
    <div className="notes-section">
      <h3>📒 Internal Notes</h3>
      <ul className="note-list">
        {notes.map((n, i) => (
          <li key={i}>
            <strong>{n.date}:</strong> {n.text}
          </li>
        ))}
      </ul>
      <textarea
        placeholder="Add a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default ClientNotes;
