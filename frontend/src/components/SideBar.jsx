import { useState } from "react"
import logo from "/logo.png"
import { NavLink } from "react-router-dom";

const list = [
  { title: "Overview", path: "/overview" },
  { title: "Customers", path: "/customers", count: 7 },
  { title: "Orders", path: "/orders", count: 1 },
  { title: "Inventory", path: "/inventory", count: 3 },
];

export default function SideBar() {
  const currentUser = { name: localStorage.getItem("username"), role: "System Administrator" };

  return (
    <div className="sm:w-[239.2px] stroke-color h-screen fixed top-0 flex flex-col justify-between border-r">
      <div>
        <div className="flex">
          <img src={logo} alt="" className="w-20 p-3" />
        </div>
        <hr className="stroke-color" />
        <h2 className="text-xs px-3 py-1 text-color uppercase tracking-wide">Navigation</h2>

        <div className="px-2">
          {list.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between w-full px-3 py-2 rounded-md transition text-[14px] font-semibold ${
                  isActive
                    ? "item-selected text-white"
                    : "text-gray-600 item-selected-hover"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.title}</span>
                  {item.count !== undefined && (
                    <span
                      className={`text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 border-t stroke-color transition ${
              isActive ? "bg-red-50" : "hover:bg-gray-50"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="w-8 h-8 rounded-full bg-[#C0392B] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-semibold leading-tight truncate ${
                    isActive ? "text-[#C0392B]" : "text-gray-800"
                  }`}
                >
                  {currentUser.name}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-color truncate">
                  {isActive ? "Settings" : currentUser.role}
                </p>
              </div>
            </>
          )}
        </NavLink>

        <div className="px-3 py-3 border-t stroke-color flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] uppercase tracking-widest text-color">
            System Online · v2.1
          </span>
        </div>
      </div>
    </div>
  );
}