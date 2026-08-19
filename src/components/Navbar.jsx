import { Bell, ChevronDown, Home } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

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

          <button
            type="button"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition"
          >

            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">
                NS
              </span>
            </div>


            <div className="text-left hidden sm:block">

              <p className="text-sm font-medium text-slate-800 leading-tight">
                Nikhilesh
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

        </div>

      </div>
    </header>
  );
};

export default Navbar;