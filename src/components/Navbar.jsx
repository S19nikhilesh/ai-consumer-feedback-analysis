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
  
        </div>
      </header>
    );
  };
  
export default Navbar;