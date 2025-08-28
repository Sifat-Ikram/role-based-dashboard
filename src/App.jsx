import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import RoleSwitcher from "./components/login/RoleSwitcher";
import LoginForm from "./components/login/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginAction } from "./redux/slices/authSlice.js";

const App = () => {
  const [role, setRole] = useState("admin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Generate fake token per role
    const token = `${role}-token`;

    // Dispatch to Redux
    dispatch(loginAction({ token, role }));

    // Redirect based on role
    if (role === "admin") navigate("/dashboard/admin");
    else if (role === "merchant") navigate("/dashboard/merchant");
    else navigate("/dashboard/member");
    reset();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Role Based Login
        </h1>

        {/* Role Switcher */}
        <RoleSwitcher role={role} setRole={setRole} />

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <LoginForm role={role} register={register} errors={errors} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md"
          >
            {role === "admin" && "Login as Admin"}
            {role === "merchant" && "Login as Merchant"}
            {role === "member" && "Login as Member"}
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default App;
