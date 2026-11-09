import { Plus } from "lucide-react";
import { NavLink } from "react-router";

const Navbar = ({searchTerm,onSearchChange }) => {
  return (
    <div className="flex justify-between w-full items-center">
      <p className="text-5xl font-bold">Your ideas, in one place</p>
      <div className="flex gap-4">
        <label className="input outline-none w-75 rounded-lg bg-transparent h-12">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} />
        </label>
        <NavLink to={"/create"} className="btn btn-active btn-warning bg-[#A36230] text-white h-12 w-46 text-xl font-medium rounded-lg">
          <Plus />
          New Note
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
