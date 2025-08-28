import { FaExclamationCircle } from "react-icons/fa";

export default function InputField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  name,
  validation,
  error,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none pl-10 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <FaExclamationCircle /> {error.message}
        </p>
      )}
    </div>
  );
}
