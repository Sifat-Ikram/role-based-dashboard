import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Card from "./Card.jsx";
import { useSelector } from "react-redux";

export default function MemberDashboard() {
  const pointsSummary = useSelector(
    (state) => state.dashboard.member.pointsSummary
  );

  const cards = [
    { title: "Total Points", value: pointsSummary?.totalPoints || 0 },
    { title: "Redeemed Points", value: pointsSummary?.redeemed || 0 },
    { title: "Available Points", value: pointsSummary?.available || 0 },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="member" />
      <div className="flex-1 p-6 bg-gray-100">
        <Topbar />

        <h1 className="text-lg md:text-2xl xl:text-4xl text-gray-900 my-10 font-bold text-center">
          Member Dashboard
        </h1>

        {/* Points Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card title={card.title} value={card.value} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state handling */}
        {!pointsSummary && (
          <p className="text-center text-gray-500 mt-4">
            No points data available
          </p>
        )}
      </div>
    </div>
  );
}
