import { BadgeCheck, ChartLineIcon, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];


const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();


  return (
    <>
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartLineIcon size={30} />
                <span className="text-2xl font-extrabold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    <aside className=" hidden lg:flex flex-col w-[100%] bg-background border-r text-dark py-6 px-4 ">
      <div onClick={()=>{navigate("/admin/dashboard")}} className="text-lg font-bold flex gap-2 cursor-pointer items-center justify-around border ">
        <ChartLineIcon size={20} />
        <h1>Admin Panel</h1>
      </div>
      <MenuItems/>
    </aside>
    </>
  );
};

const MenuItems = ({setOpen})=>{
  const navigate = useNavigate();
  return (
    <>
    <nav>
      {
        adminSidebarMenuItems.map((menuItem)=>{
          return (
            <div key={menuItem.id} onClick={
              ()=>{navigate(menuItem.path)  
                setOpen ? setOpen(false) : null
               } }
            className="flex gap-3 mx-6 my-4 py-2 px-2 rounded-md text-muted-foreground hover:bg-muted" >
              {menuItem.icon}
              <h1> {menuItem.label} </h1>

            </div>
          )
        })
      }
    </nav>
    </>
  )
}

export default Sidebar;
