import { FiSearch } from "react-icons/fi";

export default function EmptyState({ title = "No results found", message = "Try a different search term or explore our categories.", icon = "search" }: { title?: string; message?: string; icon?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        {icon === "search" ? (
          <FiSearch className="text-3xl text-gray-400" />
        ) : (
          <span className="text-3xl">🏖️</span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2 font-heading">{title}</h3>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
}
