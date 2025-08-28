import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Card from "./Card.jsx";
import { useState } from "react";

const dummyPurchases = [
  { id: 1, customer: "John Doe", amount: 50 },
  { id: 2, customer: "Jane Smith", amount: 80 },
];

export default function MerchantDashboard() {
  const [purchases, setPurchases] = useState(dummyPurchases);

  const approvePurchase = (id) => {
    alert(`Purchase ${id} approved`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="merchant" />
      <div className="flex-1 p-6 bg-gray-100">
        <Topbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
        >
          <Card title="Pending Approvals" value={purchases.length} />
          <Card title="Contribution Rate" value="10%" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4 overflow-x-auto mb-6"
        >
          <h2 className="font-bold mb-4">Approve Purchases</h2>
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.customer}</td>
                  <td className="px-4 py-2">${p.amount}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => approvePurchase(p.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4"
        >
          <h2 className="font-bold mb-2">Customer Lookup</h2>
          <input
            type="text"
            placeholder="Search customer"
            className="border rounded px-3 py-2 w-full"
          />
          <p className="mt-2 text-gray-500 text-sm">
            (Dummy search does not filter in this mock)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
