import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDatasets, getDatasetById } from "../services/api";

import StatCard from "../components/StatCard";
import SentimentChart from "../components/SentimentChart";
import RecentFeedback from "../components/RecentFeedback";
import IssueCategoryChart from "../components/IssueCategoryChart";

const Dashboard = () => {
  const navigate = useNavigate();

  const [datasets, setDatasets] = useState([]);
  const [latestDataset, setLatestDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD LATEST DATASET
  // =====================================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        setLoading(true);
        setError("");

        const data = await getDatasets(token);

        const userDatasets = data.datasets || [];

        setDatasets(userDatasets);

        if (userDatasets.length === 0) {
          setLatestDataset(null);
          return;
        }

        // Backend already sorts newest first
        const latest = userDatasets[0];

        const datasetData = await getDatasetById(
          latest._id,
          token
        );

        setLatestDataset({
          ...datasetData.dataset,
          reviews: datasetData.reviews || [],
        });
      } catch (error) {
        console.error("Dashboard loading error:", error);

        setError(
          error.message || "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">

          <h2 className="text-xl font-semibold text-slate-900">
            Loading Dashboard...
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Fetching your latest analysis.
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-white border border-red-200 rounded-xl p-10 text-center">

          <h2 className="text-xl font-semibold text-red-600">
            Failed to Load Dashboard
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // NO DATA
  // =====================================================

  if (!latestDataset) {
    return (
      <div className="p-8">

        <h2 className="text-2xl font-bold text-slate-900">
          Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          No analyzed feedback available yet.
        </p>

        <button
          onClick={() => navigate("/upload")}
          className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Upload Feedback
        </button>

      </div>
    );
  }

  // =====================================================
  // DATA
  // =====================================================

  const {
    sentiment,
    categories,
    reviews,
  } = latestDataset;

  const totalReviews = latestDataset.totalReviews || 0;

  const positivePercentage =
    totalReviews > 0
      ? (
          (sentiment.positive / totalReviews) *
          100
        ).toFixed(1)
      : "0.0";

  const negativePercentage =
    totalReviews > 0
      ? (
          (sentiment.negative / totalReviews) *
          100
        ).toFixed(1)
      : "0.0";

  const neutralPercentage =
    totalReviews > 0
      ? (
          (sentiment.neutral / totalReviews) *
          100
        ).toFixed(1)
      : "0.0";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monitor consumer feedback and sentiment insights.
        </p>

        <p className="text-xs text-slate-400 mt-2">
          Showing latest analysis:{" "}
          <span className="font-medium text-slate-600">
            {latestDataset.fileName}
          </span>
        </p>

      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          title="Total Reviews"
          value={totalReviews}
        />

        <StatCard
          title="Positive"
          value={`${positivePercentage}%`}
        />

        <StatCard
          title="Negative"
          value={`${negativePercentage}%`}
        />

        <StatCard
          title="Neutral"
          value={`${neutralPercentage}%`}
        />

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

        <SentimentChart
          sentiment={sentiment}
        />

        <IssueCategoryChart
          categories={categories}
        />

      </div>

      {/* ================= RECENT FEEDBACK ================= */}

      <RecentFeedback
        reviews={reviews}
        datasetId={latestDataset._id}
      />

    </div>
  );
};

export default Dashboard;