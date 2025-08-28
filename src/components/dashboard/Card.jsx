export default function Card({ title, value, children }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
      <h3 className="text-gray-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {children}
    </div>
  );
}
