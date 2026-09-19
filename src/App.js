import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadFeedback from "./pages/UploadFeedback";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Settings from "./pages/Settings";
import AnalysisProcessing from "./pages/AnalysisProcessing";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const AppLayout = () => {
  return (
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
          <Route
            path="/analysis/processing"
            element={<AnalysisProcessing />}
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected application */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;