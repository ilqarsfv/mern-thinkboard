import { Clock9, Star } from "lucide-react";

const NoteFilters = ({ notesLength, activeFilter, onFilterChange }) => {
  const filters = [
    { name: "All", value: "all" },
    { name: "Recent", value: "recent" },
    { name: "Favorites", value: "favorites" },
  ];

  return (
    <div className="flex gap-5 items-center mt-12">
      {filters.map((filter, index) => {
        const isActive = activeFilter === filter.value;
        return (
          <button
            onClick={() => onFilterChange(filter.value)}
            type="button"
            key={index}
            className={`rounded-xl cursor-pointer px-5 py-2 transition-colors ${isActive ? "bg-[#F5E3D1] text-black" : "bg-transparent text-gray-600 hover:bg-gray-100"}`}
          >
            {filter.value === "all" ? (
              <span className="inline-flex gap-2">
                {filter.name} <span className="inline-block px-4 py-[1px] rounded-[6px] bg-green-200 text-sm">{notesLength}</span>
              </span>
            ) : filter.value === "recent" ? (
              <span className="inline-flex items-center gap-3">
                <Clock9 /> {filter.name}
              </span>
            ) : (
              <span className="inline-flex items-center gap-3">
                <Star /> {filter.name}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default NoteFilters;
