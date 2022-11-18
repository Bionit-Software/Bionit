import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import Chart from "chart.js/auto";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { VictoryPie } from "victory";
import { useNotifications } from "../../context/NotificationsContext";
import Chip from "../Chip";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function NotificationsPieChart() {
  const [totalArrays, setTotalArrays] = React.useState(0);
  const { notifications, attendedNotifications, unattendedNotifications } =
    useNotifications();
  console.log(notifications);

  const data = {
    labels: false,
    datasets: [
      {
        label: false,
        data: [unattendedNotifications.length, attendedNotifications.length],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    animation: {
      duration: 1500,
    },

    responsive: "true",
    cutout: 75,
  };
  return (
    <div className="bg-background rounded-xl flex h-fit flex-row shadow-md col-span-5 row-span-3 px-10 gap-8 w-fit mt-auto py-4">
      <div className="py-0 h-fit">
        <Doughnut data={data} options={options} />
      </div>
      <div className="my-auto gap-6 flex flex-col justify-center">
        <h1 className="flex items-start h-fit gap-1 flex-col justify-start ">
          <span className="font-bold text-2xl text-white">
            {unattendedNotifications.length}
          </span>{" "}
          <h2 className="text-white font-bold text-sm ">
            Llamados sin atender
          </h2>
        </h1>
        <h1 className="flex items-start flex-col h-fit gap-1">
          <span className="font-bold text-2xl text-white">
            {attendedNotifications.length}
          </span>{" "}
          <h2 className="text-white font-bold text-sm ">Llamados atendidos</h2>
        </h1>
        <h1 className="flex items-start flex-col h-fit gap-1">
          <span className="font-bold text-2xl text-white">
            {(
              notifications
                .map((notification) => {
                  if (notification.status === "attended") {
                    return notification.diffTime;
                  } else {
                    return 0;
                  }
                })
                .reduce((a, b) => a + b, 0) / notifications.length
            )
              .toString()
              .trim()
              .slice(0, 4)}
          </span>{" "}
          <h2 className="text-white font-bold text-sm ">
            Promedio de respuesta
          </h2>
        </h1>
      </div>
    </div>
  );
}

// Pie chart

// Path: src
