import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { useZones } from "../../hooks/useZones";
ChartJS.register(BarController, BarElement, CategoryScale);
export default function HorizontalZonePoblationChart() {
  const { zones } = useZones();
  const data = {
    labels: zones.map((zone) => zone.name),
    datasets: [
      {
        axis: "y",
        label: "Población",
        data: zones.map((zone) => zone.totalPoblation),
        fill: "#fff",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "y",
  };

  return (
    <div className="bg-background">
      <Bar data={data} options={options} />
    </div>
  );
}
