export default function RoleSwitcher({ role, setRole }) {
  const btnClass = (value) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      role === value
        ? "bg-blue-600 text-white shadow-md"
        : "bg-gray-100 hover:bg-gray-200"
    }`;

  return (
    <div className="flex justify-center gap-3 mb-6">
      <button onClick={() => setRole("admin")} className={btnClass("admin")}>
        Admin
      </button>
      <button
        onClick={() => setRole("merchant")}
        className={btnClass("merchant")}
      >
        Merchant
      </button>
      <button onClick={() => setRole("member")} className={btnClass("member")}>
        Member
      </button>
    </div>
  );
}
