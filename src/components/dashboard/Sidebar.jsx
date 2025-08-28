import {
  FaUsers,
  FaClipboardList,
  FaBell,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice.js";

export default function Sidebar({ role }) {
  const menuItems = {
    admin: [
      { label: "Manage Users", icon: FaUsers },
      { label: "Manage Merchants", icon: FaClipboardList },
    ],
    merchant: [
      { label: "Approve Purchases", icon: FaClipboardList },
      { label: "Customer Lookup", icon: FaUsers },
      { label: "Notifications", icon: FaBell },
    ],
    member: [{ label: "Points Summary", icon: FaClipboardList }],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen hidden md:flex flex-col justify-between p-4 sticky top-0 self-start">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-3">
          {menuItems[role].map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <item.icon />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer mt-4"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
