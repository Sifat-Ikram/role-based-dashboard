import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Card from "./Card.jsx";
import dummyData from "../../../public/dummyData.json";

export default function MemberDashboard() {
  const pointsSummary = dummyData.memberData.pointsSummary;
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="member" />
      <div className="flex-1 p-6 bg-gray-100">
        <Topbar />
        <h1 className="text-lg md:text-2xl xl:text-4xl text-gray-900 my-10 font-bold text-center">
          Member Dashboard
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Card title="Total Points" value={pointsSummary.totalPoints} />
          <Card title="Redeemed Points" value={pointsSummary.redeemed} />
          <Card title="Available Points" value={pointsSummary.available} />
        </motion.div>
      </div>
    </div>
  );
}
