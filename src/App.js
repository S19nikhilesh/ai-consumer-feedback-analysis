import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatCard from "./components/Statcard";


const App = () => {
  return (
    <div>
      <Sidebar />

      <main className="ml-64">
        <Navbar />
        <StatCard title="Total Reviews" value="1,248" />
        <StatCard title="Positive" value="62.3%" />
        <StatCard title="Negative" value="25.1%" />
        <StatCard title="Neutral" value="12.6%" />
      </main>

      
    </div>
  );
};

export default App;