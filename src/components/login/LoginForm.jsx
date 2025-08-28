import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaStore, FaPhoneAlt } from "react-icons/fa";
import InputField from "./InputField.jsx";

export default function LoginForm({ role, register, errors }) {
  return (
    <motion.div
      key={role}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Admin */}
      {role === "admin" && (
        <>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
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
            validation={{ required: "Password is required" }}
            error={errors.password}
          />
        </>
      )}

      {/* Merchant */}
      {role === "merchant" && (
        <>
          <InputField
            label="Store Name"
            name="store"
            placeholder="Enter store name"
            icon={FaStore}
            register={register}
            validation={{ required: "Store name is required" }}
            error={errors.store}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            icon={FaLock}
            register={register}
            validation={{ required: "Password is required" }}
            error={errors.password}
          />
        </>
      )}

      {/* Member */}
      {role === "member" && (
        <>
          <InputField
            label="Phone or Email"
            name="identifier"
            placeholder="Enter phone or email"
            icon={FaPhoneAlt}
            register={register}
            validation={{ required: "Phone/Email is required" }}
            error={errors.identifier}
          />
          <InputField
            label="Password / OTP"
            name="password"
            type="password"
            placeholder="Enter password or OTP"
            icon={FaLock}
            register={register}
            validation={{ required: "Password or OTP is required" }}
            error={errors.password}
          />
        </>
      )}
    </motion.div>
  );
}
