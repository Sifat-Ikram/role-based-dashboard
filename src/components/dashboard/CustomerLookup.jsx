import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerLookup({ purchases }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const filteredResults = purchases.filter((p) =>
    p.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-6 relative mt-10" ref={wrapperRef}>
      {/* Dropdown above the label */}
      <AnimatePresence>
        {isFocused && (
          <motion.ul
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border rounded shadow -top-40"
          >
            {filteredResults.length > 0 ? (
              filteredResults.map((p) => (
                <li
                  key={p.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(p.customer);
                    setIsFocused(false);
                  }}
                >
                  {p.customer} - ${p.amount}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No customers found.</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      <h2 className="font-bold mb-2">Customer Lookup</h2>
      <input
        type="text"
        placeholder="Search customer"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
