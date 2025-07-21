// src/components/ClientVsAverageBarChart.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ClientVsAverageBarChart = ({ client, averages }) => {
  const data = [
    {
      name: "Spend",
      Client: client.total_spend,
      Average: averages.total_spend,
    },
    {
      name: "Visits",
      Client: client.visit_count,
      Average: averages.visit_count,
    },
    {
      name: "Buys",
      Client: client.buy_count,
      Average: averages.buy_count,
    },
    {
      name: "Conversion Rate (%)",
      Client: client.cart_conversion_rate * 100,
      Average: averages.cart_conversion_rate * 100,
    },
    {
      name: "Removals",
      Client: client.remove_count,
      Average: averages.remove_count,
    },
    {
      name: "Loyalty",
      Client: client.category_loyalty_score,
      Average: averages.category_loyalty_score,
    },
    {
      name: "Days Since Last Buy",
      Client: client.days_since_last_buy,
      Average: averages.days_since_last_buy,
    },
  ];

  return (
    <div style={{ marginTop: "2rem", width: "100%", height: 350 }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Client vs Average Metrics
      </h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Client" fill="#007bff" />
          <Bar dataKey="Average" fill="#ff7f0e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientVsAverageBarChart;
