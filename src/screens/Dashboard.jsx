import { arrayUnion, updateDoc } from "firebase/firestore";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <div className="flex grow p-4 flex-row">
        <div className="flex w-1/2 flex-col gap-12">
          <ZonesBarChart />
          <div className="flex flex-row">
            <NotificationsPieChart />
            <div className="flex grow flex-col px-4 justify-around gap-6">
              <EntityCard entity="zonas" />
              <EntityCard entity="fichas" />
              <EntityCard entity="enfermeros" />
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col"></div>
      </div>
    </Layout>
  );
}
