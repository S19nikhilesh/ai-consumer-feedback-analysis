import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

import UploadFeedback from "./pages/UploadFeedback";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Settings from "./pages/Settings";

import AnalysisProcessing from "./pages/AnalysisProcessing";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Sidebar />

        <main className="ml-64 min-h-screen bg-slate-50">
          <Navbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadFeedback />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/analysis/processing" element={<AnalysisProcessing />}/>

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;