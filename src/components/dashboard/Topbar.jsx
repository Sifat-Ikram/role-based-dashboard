import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow p-4 md:hidden">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
