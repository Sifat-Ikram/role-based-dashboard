import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-red-100 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition"
        >
          <FaHome /> Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
