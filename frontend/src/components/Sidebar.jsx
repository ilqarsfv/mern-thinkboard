import { Star, StickyNote } from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const linkClass = ({ isActive }) => `${isActive ? "bg-[#F3DAC6]" : "bg-transparent"} text-xl font-medium flex gap-4 items-center p-4 rounded-[12px] transition-all duration-300 ease-in-out hover:bg-[#F3DAC6]`;

  return (
    <aside className="fixed top-0 left-0 w-72 h-full border-r border-r-[#0004] bg-[#FDF4ED] p-6 md:block">
      <h1 className="mb-10 text-4xl font-medium">Thinkboard</h1>

      <nav className="flex flex-col gap-4 mt-24">
        <NavLink className={linkClass} to="/">
          <StickyNote /> All Notes
        </NavLink>
        <NavLink className={linkClass} to="/favorites">
          <Star /> Favorites
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
