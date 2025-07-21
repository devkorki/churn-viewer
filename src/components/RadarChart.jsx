import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const features = [
  "cart_conversion_rate",
  "total_spend",
  "visit_count",
  "category_loyalty_score",
  "buy_count",
  "remove_count"
];

const RadarChart = ({ client }) => {
  const values = features.map((feat) => client[feat]);

  const data = {
    labels: features,
    datasets: [
      {
        label: "Client Profile",
        data: values,
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "500px", marginTop: "20px" }}>
      <Radar data={data} />
    </div>
  );
};

export default RadarChart;
