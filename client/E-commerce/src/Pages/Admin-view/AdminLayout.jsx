import Header from "../../components/Admin-components/Header";
import Sidebar from "../../components/Admin-components/Sidebar.jsx";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)


  return (
    <div className="grid grid-cols-5  min-h-screen border border-red-600 w-full">

      <Sidebar open={openSidebar} setOpen ={setOpenSidebar} />
      
      <div className="flex flex-col lg:col-start-2 lg:col-end-6 md:col-start-1 md:col-end-6 max-md:col-start-1 max-md:col-end-6  ">
        <Header setOpen ={setOpenSidebar}/>
        <main className="flex flex-1 flex-col bg-muted/40 p-4 md:p-6">
        <Outlet />
        </main >
      </div>
    </div>
  );
};

export default AdminLayout;
