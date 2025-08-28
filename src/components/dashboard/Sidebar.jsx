import { FaUsers, FaClipboardList, FaBell, FaHome } from "react-icons/fa";

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

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen hidden md:flex flex-col p-4">
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
  );
}
