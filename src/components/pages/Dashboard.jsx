import { useSelector } from "react-redux";
import AdminDashboard from "../dashboard/AdminDashboard.jsx";
import MerchantDashboard from "../dashboard/MerchantDashboard.jsx";
import MemberDashboard from "../dashboard/MemberDashboard.jsx";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/" replace />;

  if (role === "admin") return <AdminDashboard />;
  if (role === "merchant") return <MerchantDashboard />;
  if (role === "member") return <MemberDashboard />;
  return null;
}
