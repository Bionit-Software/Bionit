import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import Chart from "chart.js/auto";
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
        backgroundColor: ["rgba(255, 180, 68, 0.9)"],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    indexAxis: "y",
  };

  return (
    <div className="bg-background p-6 rounded-xl px-12">
      <h1 className="text-white font-bold text-xl mb-4">Poblacion de zonas</h1>
      <Bar data={data} options={options} />
    </div>
  );
}
