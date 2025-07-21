import React from "react";
import RadarChart from "./RadarChart";
import ChurnGauge from "./ChurnGauge";
import getChurnSuggestions from "../utils/churnSuggestions";
import ClientBarChart from "./ClientBarChart";
import ClientNotes from "./ClientNotes";


const ClientDetails = ({ client, goBack, averages }) => {
    const suggestions = getChurnSuggestions(client);

    return (
        <div className="client-details-container">

            {/* Back button */}
            <div style={{ marginBottom: "1rem" }}>
                <button onClick={goBack}>⬅ Back</button>
            </div>

            {/* Title */}
            <h1 style={{ textAlign: "left", marginBottom: "1rem" }}>
                Client ID: {client.client_id}
            </h1>

            {/* Top Section */}
            <div className="top-section">
                {/* Churn Gauge */}
                <div className="gauge-section">
                    
                    <ChurnGauge probability={client.churn_probability} />
                    <p style={{ marginTop: "1rem" }}>
                        <strong>Prediction:</strong> {client.y_pred === 1 ? "Churn" : "Retain"}<br />
                        <strong>Churn Probability:</strong> {(client.churn_probability * 100).toFixed(0)}%
                    </p>
                </div>

                {/* Metrics + Suggestions */}
                <div className="metrics-and-suggestions">
                    <div className="metrics-grid">
                        <div className="metric-box"><strong>Total Spend:</strong> €{client.total_spend?.toFixed(2)}</div>
                        <div className="metric-box"><strong>Visit Count:</strong> {client.visit_count}</div>
                        <div className="metric-box"><strong>Buy Count:</strong> {client.buy_count}</div>
                        <div className="metric-box"><strong>Cart Conversion Rate:</strong> {(client.cart_conversion_rate * 100).toFixed(1)}%</div>
                        <div className="metric-box"><strong>Remove Count:</strong> {client.remove_count}</div>
                        <div className="metric-box"><strong>Category Loyalty:</strong> {client.category_loyalty_score}</div>
                        <div className="metric-box"><strong>Days Since Last Buy:</strong> {client.days_since_last_buy}</div>
                    </div>

                    <div className="suggestions-card">
                        <h4>Suggestions to Prevent Churn</h4>
                        <ul>
                            {suggestions.map((s, idx) => (
                                <li key={idx}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Radar + Bar Chart (side by side) */}
            <div className="chart-section">
                <div className="radar-chart-wrapper">
                    <RadarChart client={client} />
                </div>
                <div className="bar-chart-wrapper">
                    <ClientBarChart client={client} averages={averages} />
                </div>
            </div>

            <ClientNotes clientId={client.client_id} />

        </div>
    );
};

export default ClientDetails;
