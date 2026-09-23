import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDatasets, getDatasetById } from "../services/api";

import StatCard from "../components/StatCard";
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
      <div className="p-8 bg-[#f8fafc] min-h-[calc(100vh-76px)]">
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold text-[#172033]">
            Loading Dashboard...
          </h2>

          <p className="text-sm text-[#64748b] mt-2">
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
      <div className="p-8 bg-[#f8fafc] min-h-[calc(100vh-76px)]">
        <div className="bg-white border border-red-200 rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to Load Dashboard
          </h2>

          <p className="text-sm text-[#64748b] mt-2">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2.5 bg-[#315f8f] text-white rounded-lg text-sm font-medium hover:bg-[#274e76] transition"
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
      <div className="p-8 bg-[#f8fafc] min-h-[calc(100vh-76px)]">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-[#172033]">
            Overview
          </h2>

          <p className="text-sm text-[#64748b] mt-2">
            No analyzed feedback available yet.
          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-6 px-5 py-2.5 bg-[#315f8f] text-white rounded-lg text-sm font-medium hover:bg-[#274e76] transition"
          >
            Upload Feedback
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // DATA
  // =====================================================

  const {
    sentiment = {},
    reviews = [],
  } = latestDataset;

  const totalReviews = latestDataset.totalReviews || 0;

  const positivePercentage =
    totalReviews > 0
      ? ((sentiment.positive / totalReviews) * 100).toFixed(1)
      : "0.0";

  const negativePercentage =
    totalReviews > 0
      ? ((sentiment.negative / totalReviews) * 100).toFixed(1)
      : "0.0";

  const neutralPercentage =
    totalReviews > 0
      ? ((sentiment.neutral / totalReviews) * 100).toFixed(1)
      : "0.0";

  // =====================================================
  // CATEGORY + SENTIMENT AGGREGATION
  // =====================================================

  const categorySentiment = {};

  reviews.forEach((review) => {
    const category = review.category || "Other";
    const sentimentValue = (
      review.sentiment || "neutral"
    ).toLowerCase();

    if (!categorySentiment[category]) {
      categorySentiment[category] = {
        positive: 0,
        negative: 0,
        neutral: 0,
      };
    }

    if (sentimentValue === "positive") {
      categorySentiment[category].positive += 1;
    } else if (sentimentValue === "negative") {
      categorySentiment[category].negative += 1;
    } else {
      categorySentiment[category].neutral += 1;
    }
  });

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="p-8 bg-[#f8fafc] min-h-[calc(100vh-76px)]">

      {/* ================= HEADER ================= */}

      <div className="mb-7">
        <div className="flex items-start justify-between gap-6">

          <div>
            <h2 className="text-2xl font-semibold text-[#172033]">
              Overview
            </h2>

            <p className="text-sm text-[#64748b] mt-1.5">
              Monitor consumer feedback and sentiment insights.
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-[#94a3b8]">
              Latest Analysis
            </p>

            <p className="text-sm font-medium text-[#334155] mt-1">
              {latestDataset.fileName}
            </p>
          </div>

        </div>
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

      {/* ================= CATEGORY ANALYSIS ================= */}

      <div className="mt-6">
        <IssueCategoryChart
          categorySentiment={categorySentiment}
        />
      </div>

      {/* ================= RECENT FEEDBACK ================= */}

      <div className="mt-6">
        <RecentFeedback
          reviews={reviews}
          datasetId={latestDataset._id}
        />
      </div>

    </div>
  );
};

export default Dashboard;