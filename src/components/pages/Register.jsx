import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import RoleSwitcher from "../login/RoleSwitcher.jsx";
import InputField from "../login/InputField.jsx";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../redux/slices/authSlice.js";

export default function Register() {
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
    const token = `${role}-token`;

    // Dispatch to Redux
    dispatch(loginAction({ token, role }));

    console.log(`${role.toUpperCase()} REGISTRATION DATA:`, data);
    reset();

    // Redirect to dashboard based on role
    if (role === "admin") navigate("/dashboard/admin");
    else if (role === "merchant") navigate("/dashboard/merchant");
    else navigate("/dashboard/member");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Role Based Registration
        </h1>

        {/* Role Switcher */}
        <RoleSwitcher role={role} setRole={setRole} />

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Name"
            name="name"
            placeholder="Enter your full name"
            icon={FaUser}
            register={register}
            validation={{ required: "Name is required" }}
            error={errors.name}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={FaEnvelope}
            register={register}
            validation={{ required: "Email is required" }}
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            icon={FaLock}
            register={register}
            validation={{
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            }}
            error={errors.password}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md"
          >
            Register as {role.charAt(0).toUpperCase() + role.slice(1)}
          </motion.button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
