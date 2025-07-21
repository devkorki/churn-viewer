// src/components/ClientTable.jsx
import React from "react";
import "./ClientTable.css"; // Create this CSS file too

const ClientTable = ({ clients, onViewClient }) => {
  return (
    <div className="table-container">
      <h2>Top 100 Churn Predictions</h2>
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Churn Probability</th>
            <th>Prediction</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.client_id}>
              <td>{client.client_id}</td>
              <td>{client.churn_probability.toFixed(2)}</td>
              <td>{client.y_pred === 1 ? "Churn" : "Retain"}</td>
              <td>
                <button onClick={() => onViewClient(client.client_id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
