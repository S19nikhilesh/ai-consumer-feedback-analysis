import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";


const App = () => {
  return (
    <div>
      <Sidebar />

      <main className="ml-64">
        <Navbar />
        <Dashboard/>
      </main>

      
    </div>
  );
};

export default App;