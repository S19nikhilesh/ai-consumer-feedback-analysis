import { Bell, ChevronDown, Home, LogOut } from "lucide-react";
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
      subtitle: "Manage your account and preferences",
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
    <header className="h-20 bg-white border-b border-slate-200">
      <div className="h-full px-8 flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* Small Home Indicator */}

          <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <Home
              size={17}
              className="text-slate-500"
            />
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">
              {currentPage.title}
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              {currentPage.subtitle}
            </p>
          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          {/* Notification */}

          <button
            type="button"
            aria-label="Notifications"
            className="relative h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
          >
            <Bell size={18} />

            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {/* Divider */}

          <div className="h-8 w-px bg-slate-200 mx-1" />

          {/* Profile */}

          <div className="relative">

            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition"
            >

              <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-xs font-semibold text-white">
                  {userInitials}
                </span>
              </div>

              <div className="text-left hidden sm:block">

                <p className="text-sm font-medium text-slate-800 leading-tight">
                  {userName}
                </p>

                <p className="text-xs text-slate-500 mt-0.5">
                  CSE Student
                </p>

              </div>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />

            </button>

            {/* Profile Dropdown */}

            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <LogOut size={17} className="text-slate-500" />
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