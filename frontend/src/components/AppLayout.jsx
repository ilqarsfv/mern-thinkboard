import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col min-h-screen w-full pt-18 pb-6 px-24 md:ml-72 bg-[#FDF8F4]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
