import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Card from "./Card.jsx";

const dummyUsers = [
  { id: 1, name: "John Doe", role: "Member" },
  { id: 2, name: "Jane Smith", role: "Merchant" },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 bg-gray-100">
        <Topbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
        >
          <Card title="Total Users" value={dummyUsers.length} />
          <Card title="Total Merchants" value={1} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4 overflow-x-auto"
        >
          <h2 className="font-bold mb-4">Users & Merchants</h2>
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
