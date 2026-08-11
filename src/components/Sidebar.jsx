import {
    LayoutDashboard,
    Upload,
    BarChart3,
    FileText,
    History,
    Settings,
    LogOut,
  } from "lucide-react";
  
  const Sidebar = () => {
    return (
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white flex flex-col">
        
       
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
  
            <div>
              <h1 className="text-lg font-bold">FeedbackAI</h1>
              <p className="text-xs text-slate-400">Consumer Insights</p>
            </div>
          </div>
        </div>
  
        <nav className="flex-1 px-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 mb-3">
            Main Menu
          </p>
  
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 text-white">
              <LayoutDashboard size={19} />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
  
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition">
              <Upload size={19} />
              <span className="text-sm font-medium">Upload Feedback</span>
            </button>
  
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition">
              <BarChart3 size={19} />
              <span className="text-sm font-medium">Analysis</span>
            </button>
  
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition">
              <FileText size={19} />
              <span className="text-sm font-medium">Reports</span>
            </button>
  
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition">
              <History size={19} />
              <span className="text-sm font-medium">History</span>
            </button>
          </div>
  
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 mt-8 mb-3">
            System
          </p>
  
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition">
            <Settings size={19} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>
  
      
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition">
            <LogOut size={19} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;