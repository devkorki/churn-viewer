// src/components/ChurnGauge.jsx
import React from "react";
import { RadialBarChart, RadialBar } from "recharts";

const ChurnGauge = ({ probability }) => {
  const percentage = +(probability * 100).toFixed(0);

  const data = [
    {
      name: "Churn Risk",
      value: percentage,
      fill: percentage > 50 ? "#ff4d4f" : "#52c41a", // Red if high risk, green if low
    },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Churn Probability</h3>

      <RadialBarChart
        width={250}
        height={140}
        cx="50%"
        cy="100%"
        innerRadius={70}
        outerRadius={100}
        barSize={18}
        data={data}
        startAngle={180}
        endAngle={0}  // half-circle
      >
        <RadialBar
          dataKey="value"
          clockWise
          cornerRadius={10}
        />
        <text
          x="50%"
          y="90%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          {percentage}%
        </text>
      </RadialBarChart>

    </div>
  );
};

export default ChurnGauge;
