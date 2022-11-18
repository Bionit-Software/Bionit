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

  const data = {
    labels: zones.map((zone) => {
      if (zone.notifications) {
        return zone.name;
      }
    }),
    datasets: [
      {
        label: "Notificaciones",
        data: zones.map((zone) => {
          if (zone.notifications) {
            return zone.notifications.length;
          }
        }),
        backgroundColor: ["rgba(240, 83, 62, 0.8)"],
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
