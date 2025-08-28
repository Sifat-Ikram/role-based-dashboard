import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  removeUser,
  addMerchant,
  removeMerchant,
} from "../../redux/slices/dashboardSlice.js";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const { users, merchants } = useSelector((state) => state.dashboard.admin);
  const dispatch = useDispatch();

  const [showUserForm, setShowUserForm] = useState(false);
  const [showMerchantForm, setShowMerchantForm] = useState(false);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [newMerchant, setNewMerchant] = useState({ name: "", email: "" });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Name and Email are required!",
      });
      return;
    }
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    dispatch(addUser({ id, ...newUser, role: "Member" }));
    setNewUser({ name: "", email: "" });
    Swal.fire({
      icon: "success",
      title: "User Added",
      text: `User ${newUser.name} added successfully!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleAddMerchant = (e) => {
    e.preventDefault();
    if (!newMerchant.name.trim() || !newMerchant.email.trim()) return;
    const id = Date.now();
    dispatch(addMerchant({ id, ...newMerchant }));
    setNewMerchant({ name: "", email: "" });
    setShowMerchantForm(false); // auto-hide
  };

  const handleRemoveUser = (id, name) => {
    Swal.fire({
      title: `Remove ${name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC143C",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeUser(id));
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: `${name} has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleRemoveMerchant = (id, name) => {
    Swal.fire({
      title: `Remove ${name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC143C",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeMerchant(id));
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: `${name} has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 bg-gray-100">
        <Topbar />

        <h1 className="text-lg md:text-2xl xl:text-4xl text-gray-900 my-10 font-bold text-center">
          Admin Dashboard
        </h1>

        {/* Cards */}
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
          className="bg-white shadow rounded-lg p-4 overflow-x-auto mb-6"
        >
          <div className="flex flex-col sm:flex-row max-sm:gap-4 items-center justify-between">
            <h2 className="font-bold mb-4">Users</h2>
            <button
              onClick={() => setShowUserForm((prev) => !prev)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showUserForm ? "Cancel" : "Add User"}
            </button>
          </div>
          {showUserForm && (
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <h2 className="font-bold mb-4">Add New User</h2>
              <form
                onSubmit={handleAddUser}
                className="flex flex-col md:flex-row gap-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full md:w-1/3"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full md:w-1/3"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </form>
            </div>
          )}
          <table className="min-w-full text-center mt-5">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No users available
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
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
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveUser(user.id, user.name)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4 overflow-x-auto mt-10"
        >
          <div className="flex flex-col sm:flex-row max-sm:gap-4 items-center justify-between">
            <h2 className="font-bold mb-4">Merchants</h2>
            <button
              onClick={() => setShowMerchantForm((prev) => !prev)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showMerchantForm ? "Cancel" : "Add Merchant"}
            </button>
          </div>
          {showMerchantForm && (
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <h2 className="font-bold mb-4">Add New Merchant</h2>
              <form
                onSubmit={handleAddMerchant}
                className="flex flex-col md:flex-row gap-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={newMerchant.name}
                  onChange={(e) =>
                    setNewMerchant({ ...newMerchant, name: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full md:w-1/3"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newMerchant.email}
                  onChange={(e) =>
                    setNewMerchant({ ...newMerchant, email: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full md:w-1/3"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </form>
            </div>
          )}
          <table className="min-w-full text-center mt-5">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {merchants.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No merchants available
                  </td>
                </tr>
              ) : (
                merchants.map((merchant, index) => (
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
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          handleRemoveMerchant(merchant.id, merchant.name)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
