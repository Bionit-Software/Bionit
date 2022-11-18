import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import Chart from "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";
import { useZones } from "../../hooks/useZones";

ChartJS.register(BarController, BarElement, CategoryScale);
export default function ZonesBarChart() {
  const { zones } = useZones();
  console.log(zones.map((zone) => zone.notifications.length));
  const data = {
    labels: zones.map((zone) => zone.name),
    datasets: [
      {
        label: false,
        data: zones.map((zone) => zone.notifications.length),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    animation: {
      duration: 1500,
    },
  };
  return (
    <div className="bg-background p-6 py-6 shadow-md rounded-xl w-full ">
      <h1 className="text-white font-bold text-xl mb-4">Llamados por zona</h1>
      <Bar data={data} options={options} />
    </div>
  );
}
