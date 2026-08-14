import React from "react";
import Sidebar from "./components/Sidebar";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Sidebar />

      <main className="ml-64">
        <Navbar />
      </main>
    </div>
  );
};

export default App;