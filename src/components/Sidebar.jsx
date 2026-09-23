import {
  LayoutDashboard,
  Upload,
  BarChart3,
  History,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Upload Feedback",
      path: "/upload",
      icon: Upload,
    },
    {
      name: "Analysis",
      path: "/analysis",
      icon: BarChart3,
    },
    {
      name: "History",
      path: "/history",
      icon: History,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#0f172a] text-white flex flex-col border-r border-[#1e293b]">

      {/* ================= BRAND ================= */}

      <div className="h-20 px-5 flex items-center border-b border-[#1e293b]">

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-lg bg-[#3b82f6] flex items-center justify-center">
            <BarChart3 size={20} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-[17px] font-semibold tracking-tight">
              FeedbackAI
            </h1>

            <p className="text-[11px] text-[#94a3b8] mt-0.5">
              Consumer Insights
            </p>
          </div>

        </div>

      </div>


      {/* ================= NAVIGATION ================= */}

      <nav className="flex-1 px-3 py-7">

        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
          Workspace
        </p>

        <div className="space-y-1.5">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-[#1e3a5f] text-white"
                      : "text-[#cbd5e1] hover:bg-[#172033] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.9}
                    />

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

        </div>


        {/* ================= ACCOUNT ================= */}

        <div className="mt-10">

          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
            Account
          </p>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm transition ${
                isActive
                  ? "bg-[#1e3a5f] text-white"
                  : "text-[#cbd5e1] hover:bg-[#172033] hover:text-white"
              }`
            }
          >
            <Settings size={18} />

            <span className="font-medium">
              Settings
            </span>

          </NavLink>

        </div>

      </nav>


      {/* ================= LOGOUT ================= */}

      <div className="p-3 border-t border-[#1e293b]">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm text-[#cbd5e1] hover:bg-[#172033] hover:text-white transition"
        >
          <LogOut size={18} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;