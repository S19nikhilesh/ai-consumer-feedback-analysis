import { Bell, ChevronDown } from "lucide-react";

const Navbar = () => {
    return (
      <header className="h-20 bg-white border-b border-slate-200">
        <div className="h-full px-8 flex items-center justify-between">
          
            <div>
                <h1 className="text-xl font-semibold text-slate-900">
                Dashboard
                </h1>
  
                <p className="text-sm text-slate-500">
                Consumer feedback overview
                </p>
            </div>

            <div className="flex items-center gap-5">

                <button className="relative text-slate-500 hover:text-slate-900">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-700">NS</span>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-800">Nikhilesh</p>
                        <p className="text-xs text-slate-500">CSE Student</p>
                    </div>

                    <ChevronDown size={16} className="text-slate-400" />
                </div>

            </div>
        </div>
      </header>
    );
  };
  
export default Navbar;