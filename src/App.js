import React, { useState, useEffect } from "react";
import useClientData from "./data/useClientData";
import ClientDetails from "./components/ClientDetails";
import "./App.css";

import calculateAverages from "./utils/calculateAverages";

function App() {
  const data = useClientData();
  const [selectedClient, setSelectedClient] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);
  const [flaggedClients, setFlaggedClients] = useState(() => {
    const saved = localStorage.getItem("flagged_clients");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState("all"); // "all", "top", "flagged"
  const [toastMessage, setToastMessage] = useState(null);

  const [noteModalClient, setNoteModalClient] = useState(null);
  const [noteText, setNoteText] = useState("");

  const [modalNotes, setModalNotes] = useState([]);


  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    localStorage.setItem("flagged_clients", JSON.stringify(flaggedClients));
  }, [flaggedClients]);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const handleFlagClient = (client) => {
    const isFlagged = flaggedClients.some(c => c.client_id === client.client_id);

    if (isFlagged) {
      setFlaggedClients(prev => prev.filter(c => c.client_id !== client.client_id));
      setToastMessage(`Client ${client.client_id} removed from flagged list`);
    } else {
      setFlaggedClients(prev => [...prev, client]);
      setToastMessage(`Client ${client.client_id} flagged for review`);
    }

    setTimeout(() => setToastMessage(null), 3000);
  };


  const hasNotes = (clientId) => {
    const saved = localStorage.getItem(`client_notes_${clientId}`);
    return saved && JSON.parse(saved).length > 0;
  };

  const [searchTerm, setSearchTerm] = useState("");


  const filteredData = data.filter(c => !isNaN(c.churn_probability));
  const averages = calculateAverages(filteredData);

  const topClients = [...filteredData]
    .sort((a, b) => b.churn_probability - a.churn_probability)
    .slice(0, 100);

  const allClients = filteredData.slice(0, visibleCount);

  let displayedClients = [];
  if (activeTab === "top") displayedClients = topClients;
  else if (activeTab === "flagged") displayedClients = flaggedClients;
  else displayedClients = allClients;

  // 🔍 Filter by search term
  if (searchTerm.trim() !== "") {
    displayedClients = displayedClients.filter((client) =>
      client.client_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  const sortedClients = [...displayedClients];

  if (sortConfig.key) {
    sortedClients.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Normalize prediction field
      if (sortConfig.key === "y_pred") {
        aVal = aVal === 1 ? "Churn" : "Retain";
        bVal = bVal === 1 ? "Churn" : "Retain";
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }


  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };


  const handleExportCSV = () => {
    if (flaggedClients.length === 0) return;

    const header = Object.keys(flaggedClients[0]);
    const rows = flaggedClients.map(client =>
      header.map(field => JSON.stringify(client[field] ?? "")).join(",")
    );
    const csvContent = [header.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "flagged_clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="app-container">
      {!selectedClient && (
        <>
          {/* === Top Header with Tabs & Dark Mode === */}
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              flexWrap: "wrap"
            }}
          >
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setActiveTab("all")}
                style={{
                  backgroundColor: activeTab === "all" ? "#007bff" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem"
                }}
              >
                All Clients
              </button>
              <button
                onClick={() => setActiveTab("top")}
                style={{
                  backgroundColor: activeTab === "top" ? "#007bff" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem"
                }}
              >
                Top 100
              </button>
              <button
                onClick={() => setActiveTab("flagged")}
                style={{
                  backgroundColor: activeTab === "flagged" ? "#007bff" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem"
                }}
              >
                Flagged ({flaggedClients.length})
              </button>
            </div>

            <div className="toggle-container">
              <span style={{ marginRight: "0.5rem" }}>🌞</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(prev => !prev)}
                />
                <span className="slider round"></span>
              </label>
              <span style={{ marginLeft: "0.5rem" }}>🌙</span>
            </div>
          </header>
          {!selectedClient && activeTab === "flagged" && flaggedClients.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <button
                onClick={handleExportCSV}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1.5rem",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Export Flagged to CSV
              </button>
            </div>
          )}



        </>
      )}
      {!selectedClient && (
        <div style={{ position: "relative", display: "inline-block", width: "100%", maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="Search by client ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 32px 8px 8px",
              borderRadius: "8px",
              width: "100%",
              border: "1px solid #ccc"
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                color: "#888"
              }}
              title="Clear"
            >
              ✕
            </button>
          )}
        </div>
      )}


      {toastMessage && (
        <div
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          {toastMessage}
        </div>
      )}

      {!selectedClient ? (
        <>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("client_id")} style={{ cursor: "pointer" }}>
                  Client ID {sortConfig.key === "client_id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("churn_probability")} style={{ cursor: "pointer" }}>
                  Churn Probability {sortConfig.key === "churn_probability" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("y_pred")} style={{ cursor: "pointer" }}>
                  Prediction {sortConfig.key === "y_pred" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Action</th>
                <th>Flag</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>


              {sortedClients.map((client, idx) => {
                const isFlagged = flaggedClients.some(c => c.client_id === client.client_id);

                // Get note count safely
                const noteCount = (() => {
                  try {
                    const notes = JSON.parse(localStorage.getItem(`client_notes_${client.client_id}`));
                    return notes?.length || 0;
                  } catch {
                    return 0;
                  }
                })();

                return (
                  <tr key={idx}>
                    <td>{client.client_id}</td>
                    <td>{client.churn_probability.toFixed(2)}</td>
                    <td>{client.y_pred === 1 ? "Churn" : "Retain"}</td>
                    <td>
                      <button onClick={() => setSelectedClient(client)}>View</button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleFlagClient(client)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "18px",
                          color: isFlagged ? "orange" : "red"
                        }}
                        title={isFlagged ? "Unflag" : "Flag this client"}
                      >
                        🚩
                      </button>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        title="View/Edit Notes"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                          fontSize: "16px",
                          cursor: "pointer",
                          color: noteCount > 0 ? "#333" : "#aaa"
                        }}
                        onClick={() => {
                          const saved = localStorage.getItem(`client_notes_${client.client_id}`);
                          let parsedNotes = [];

                          if (saved) {
                            try {
                              const parsed = JSON.parse(saved);
                              parsedNotes = Array.isArray(parsed)
                                ? parsed.map(n =>
                                  typeof n === "string" ? { text: n, date: new Date().toLocaleString() } : n
                                )
                                : [];
                            } catch {
                              parsedNotes = [];
                            }
                          }

                          setModalNotes(parsedNotes);
                          setNoteText("");
                          setNoteModalClient(client);
                        }}

                      >
                        📝
                        {noteCount > 0 && (
                          <span style={{ fontSize: "13px", color: "#555" }}>({noteCount})</span>
                        )}
                      </span>
                    </td>


                  </tr>
                );
              })}
            </tbody>

          </table>

          {activeTab === "all" && visibleCount < filteredData.length && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button onClick={handleLoadMore}>Load More</button>
            </div>
          )}
        </>
      ) : (
        // <ClientDetails client={selectedClient} goBack={() => setSelectedClient(null)} />
        <ClientDetails
          client={selectedClient}
          goBack={() => setSelectedClient(null)}
          averages={averages}
        />


      )}


      {noteModalClient && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "500px",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <h3>Notes for Client {noteModalClient.client_id}</h3>

            {/* Display notes */}
            <div style={{ marginBottom: "1rem" }}>
              {modalNotes.length === 0 ? (
                <p style={{ color: "#888" }}>No notes yet.</p>
              ) : (
                modalNotes.map((n, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "0.5rem 1rem",
                      marginBottom: "0.5rem",
                      background: "#f9f9f9",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.85rem", color: "#666" }}>{n.date}</div>
                      <div>{n.text}</div>
                    </div>
                    <button
                      onClick={() => {
                        const updated = modalNotes.filter((_, i) => i !== idx);
                        setModalNotes(updated);
                        localStorage.setItem(
                          `client_notes_${noteModalClient.client_id}`,
                          JSON.stringify(updated)
                        );
                      }}
                      title="Delete note"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      <img
                        src="/delete.png"
                        alt="Delete"
                        style={{ width: "20px", height: "20px", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
                      />
                    </button>

                  </div>
                ))

              )}
            </div>

            {/* Input to add new note */}
            <textarea
              placeholder="Add a new note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={3}
              style={{ width: "100%", marginBottom: "1rem" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => setNoteModalClient(null)}>Cancel</button>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => {
                    if (noteText.trim() === "") return;
                    const newNote = {
                      text: noteText.trim(),
                      date: new Date().toLocaleString()
                    };
                    const updatedNotes = [...modalNotes, newNote];
                    setModalNotes(updatedNotes);
                    setNoteText("");
                    localStorage.setItem(
                      `client_notes_${noteModalClient.client_id}`,
                      JSON.stringify(updatedNotes)
                    );
                  }}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px"
                  }}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
