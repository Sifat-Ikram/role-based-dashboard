import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  approvePurchase,
  setContributionRate,
} from "../../redux/slices/dashboardSlice.js";
import Swal from "sweetalert2";
import { useState } from "react";
import CustomerLookup from "./CustomerLookup.jsx";

export default function MerchantDashboard() {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.dashboard.merchant.purchases);
  const notifications = useSelector(
    (state) => state.dashboard.merchant.notifications
  );
  const contributionRate = useSelector(
    (state) => state.dashboard.merchant.contributionRate
  );

  const [localContributionRate, setLocalContributionRate] =
    useState(contributionRate);
  const [loadingId, setLoadingId] = useState(null);
  const [settingRate, setSettingRate] = useState(false);
  const [inputError, setInputError] = useState("");

  const handleApprove = (id) => {
    setLoadingId(id);
    setTimeout(() => {
      dispatch(approvePurchase(id));
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: `Purchase ${id} has been approved.`,
        timer: 1500,
        showConfirmButton: false,
      });
      setLoadingId(null);
    }, 500);
  };

  const handleLocalContributionChange = (e) => {
    setLocalContributionRate(e.target.value);
  };

  const handleSetContribution = () => {
    const numericValue = Number(localContributionRate);
    if (localContributionRate === "" || isNaN(numericValue)) {
      setInputError("Please enter a valid number");
      return;
    }
    setInputError("");
    setSettingRate(true);
    setTimeout(() => {
      dispatch(setContributionRate(numericValue));
      setSettingRate(false);
      Swal.fire({
        icon: "success",
        title: "Contribution Rate Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    }, 800);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="merchant" />
      <div className="flex-1 p-6 bg-gray-100">
        <Topbar />

        <h1 className="text-lg md:text-2xl xl:text-4xl text-gray-900 my-10 font-bold text-center">
          Merchant Dashboard
        </h1>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
        >
          <Card title="Pending Approvals" value={purchases.length} />
          <Card title="Contribution Rate" value={`${contributionRate}%`} />
          <Card title="Notifications" value={notifications.length} />
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
              {purchases.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No pending purchases
                  </td>
                </tr>
              ) : (
                purchases.map((p, index) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b"
                  >
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2">{p.customer}</td>
                    <td className="px-4 py-2">${p.amount}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleApprove(p.id)}
                        disabled={loadingId === p.id}
                        className={`px-3 py-1 rounded text-white ${
                          loadingId === p.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500"
                        }`}
                      >
                        {loadingId === p.id ? "Processing..." : "Approve"}
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        <div className="mb-6">
          <h2 className="font-bold mb-2">Set Contribution Rate</h2>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={localContributionRate}
              onChange={handleLocalContributionChange}
              className="border rounded px-3 py-2 w-full max-w-xs"
              placeholder={contributionRate}
            />
            <button
              onClick={handleSetContribution}
              disabled={settingRate}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                settingRate ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {settingRate ? "Setting..." : "Set Rate"}
            </button>
          </div>
          {inputError && <p className="text-red-500 mt-1">{inputError}</p>}
          <p className="text-gray-500 mt-1">
            Current Rate: {contributionRate}%
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4 overflow-x-auto mb-6"
        >
          <h2 className="font-bold mb-4">Notifications</h2>
          <ul className="list-disc list-inside">
            {notifications.length === 0 ? (
              <li className="text-gray-500">No notifications</li>
            ) : (
              notifications.map((note, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {note}
                </motion.li>
              ))
            )}
          </ul>
        </motion.div>

        <CustomerLookup purchases={purchases} />
      </div>
    </div>
  );
}
