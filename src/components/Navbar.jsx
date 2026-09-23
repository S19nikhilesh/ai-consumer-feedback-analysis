import { ChevronDown, Home, LogOut, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pageInfo = {
    "/": {
      title: "Dashboard",
      subtitle: "Overview of your consumer feedback",
    },

    "/upload": {
      title: "Upload Feedback",
      subtitle: "Upload consumer feedback for analysis",
    },

    "/analysis": {
      title: "Detailed Analysis",
      subtitle: "Explore insights from your feedback",
    },

    "/analysis/processing": {
      title: "Processing Analysis",
      subtitle: "Your feedback is being analyzed",
    },

    "/history": {
      title: "Analysis History",
      subtitle: "View your previous feedback analyses",
    },

    "/settings": {
      title: "Settings",
      subtitle: "Manage your account information",
    },
  };

  const currentPage = pageInfo[location.pathname] || {
    title: "Consumer Feedback Analytics",
    subtitle: "Monitor and analyze consumer feedback",
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  const handleSettings = () => {
    setShowProfileMenu(false);
    navigate("/settings");
  };

  const userName = user?.name || "Nikhilesh";

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NS";

  return (
    <header className="h-[76px] bg-white border-b border-[#e2e8f0]">

      <div className="h-full px-8 flex items-center justify-between">

        {/* ================= LEFT ================= */}

        <div className="flex items-center gap-4">

          {/* Page Indicator */}

          <div className="h-9 w-9 rounded-lg bg-[#eff6ff] flex items-center justify-center">
            <Home
              size={17}
              className="text-[#416f9f]"
              strokeWidth={2}
            />
          </div>

          <div className="h-7 w-px bg-[#e2e8f0]" />

          <div>

            <h1 className="text-[18px] font-semibold text-[#172033] leading-tight">
              {currentPage.title}
            </h1>

            <p className="text-xs text-[#64748b] mt-1">
              {currentPage.subtitle}
            </p>

          </div>

        </div>


        {/* ================= RIGHT ================= */}

        <div className="flex items-center">

          <div className="relative">

            {/* Profile Button */}

            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[#f8fafc] transition"
            >

              <div className="h-9 w-9 rounded-full bg-[#315f8f] flex items-center justify-center">
                <span className="text-xs font-semibold text-white">
                  {userInitials}
                </span>
              </div>

              <div className="text-left hidden sm:block">

                <p className="text-sm font-medium text-[#172033] leading-tight">
                  {userName}
                </p>

                <p className="text-xs text-[#64748b] mt-0.5">
                  CSE Student
                </p>

              </div>

              <ChevronDown
                size={16}
                className={`text-[#64748b] transition-transform ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />

            </button>


            {/* ================= PROFILE DROPDOWN ================= */}

            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-52 bg-white border border-[#e2e8f0] rounded-xl shadow-lg py-2 z-50">

                <div className="px-4 py-3 border-b border-[#e2e8f0]">

                  <p className="text-sm font-medium text-[#172033]">
                    {userName}
                  </p>

                  <p className="text-xs text-[#64748b] mt-1">
                    {user?.email || "CSE Student"}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={handleSettings}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#334155] hover:bg-[#f8fafc] transition"
                >
                  <Settings
                    size={16}
                    className="text-[#64748b]"
                  />

                  Settings
                </button>


                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#334155] hover:bg-[#f8fafc] transition"
                >
                  <LogOut
                    size={16}
                    className="text-[#64748b]"
                  />

                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;