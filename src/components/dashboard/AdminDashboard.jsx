import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Card from "./Card.jsx";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const users = useSelector((state) => state.dashboard.admin.users);
  const merchants = useSelector((state) => state.dashboard.admin.merchants);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 bg-gray-100">
        <Topbar />
        <h1 className="text-lg md:text-2xl xl:text-4xl text-gray-900 my-10 font-bold text-center">
          Admin Dashboard
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <Card title="Total Users" value={users.length} />
          <Card title="Total Merchants" value={merchants.length} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4 overflow-x-auto"
        >
          <h2 className="font-bold mb-4">Users</h2>
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b"
                >
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4 overflow-x-auto mt-10"
        >
          <h2 className="font-bold mb-4">merchants</h2>
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant, index) => (
                <motion.tr
                  key={merchant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b"
                >
                  <td className="px-4 py-2">{merchant.id}</td>
                  <td className="px-4 py-2">{merchant.name}</td>
                  <td className="px-4 py-2">{merchant.email}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
