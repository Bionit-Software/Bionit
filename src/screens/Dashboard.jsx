import { arrayUnion, updateDoc } from "firebase/firestore";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HorizontalZonePoblationChart from "../components/Charts/HorizontalZonePoblationChart";
import NotificationsHistorial from "../components/Charts/NotificationsHistorial";
import NotificationsPieChart from "../components/Charts/NotificationsPieChart";
import ZonesBarChart from "../components/Charts/ZonesBarChart";
import EntityCard from "../components/EntityCard";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Layout from "./Layout/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <PageTitle title="Dashboard" />
      <div className="flex grow p-4 flex-row gap-x-4">
        <div className="flex w-1/2 flex-col gap-4">
          <ZonesBarChart />
          <div className="flex flex-row grow ">
            <NotificationsPieChart />
            <div className="flex grow flex-col px-4 justify-around gap-6">
              <EntityCard entity="zonas" />
              <EntityCard entity="fichas" />
              <EntityCard entity="enfermeros" />
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-y-4">
          <HorizontalZonePoblationChart />
          <NotificationsHistorial />
        </div>
      </div>
    </Layout>
  );
}
