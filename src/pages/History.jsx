import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye } from "lucide-react";

import { getDatasets } from "../services/api";

const History = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DATASETS
  // =====================================================

  useEffect(() => {
    const loadDatasets = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        setLoading(true);
        setError("");

        const data = await getDatasets(token);

        setDatasets(data.datasets || []);
      } catch (error) {
        console.error("Failed to load history:", error);

        setError(
          error.message || "Failed to load analysis history."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDatasets();
  }, [navigate]);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredDatasets = datasets.filter((dataset) =>
    dataset.fileName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // =====================================================
  // VIEW ANALYSIS
  // =====================================================

  const handleViewAnalysis = (datasetId) => {
    navigate("/analysis", {
      state: {
        datasetId,
      },
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Loading Analysis History...
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Fetching your previous analyses.
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
            Failed to Load History
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
  // UI
  // =====================================================

  return (
    <div className="p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-900">
          Analysis History
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          View previously analyzed consumer feedback datasets.
        </p>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* ================= HISTORY TABLE ================= */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-slate-200">

          <h3 className="text-lg font-semibold text-slate-900">
            Previous Analyses
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {filteredDatasets.length} analysis
            {filteredDatasets.length !== 1 ? "es" : ""} found
          </p>

        </div>

        {filteredDatasets.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-200 text-sm text-slate-500">

                  <th className="px-6 py-4 font-medium">
                    File
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Uploaded
                  </th>

                  <th className="px-6 py-4 font-medium text-center">
                    Reviews
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Sentiment
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredDatasets.map((dataset) => {

                  const totalReviews =
                    dataset.totalReviews || 0;

                  const positivePercentage =
                    totalReviews > 0
                      ? Math.round(
                          (dataset.sentiment.positive /
                            totalReviews) *
                            100
                        )
                      : 0;

                  const negativePercentage =
                    totalReviews > 0
                      ? Math.round(
                          (dataset.sentiment.negative /
                            totalReviews) *
                            100
                        )
                      : 0;

                  const uploadedDate = dataset.uploadedAt
                    ? new Date(
                        dataset.uploadedAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—";

                  return (

                    <tr
                      key={dataset._id}
                      className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition"
                    >

                      {/* FILE */}

                      <td className="px-6 py-5">

                        <div>

                          <p className="text-sm font-medium text-slate-900">
                            {dataset.fileName}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            ID: {dataset._id}
                          </p>

                        </div>

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-5">

                        <p className="text-sm text-slate-600">
                          {uploadedDate}
                        </p>

                      </td>

                      {/* REVIEWS */}

                      <td className="px-6 py-5 text-center">

                        <span className="text-sm font-medium text-slate-700">
                          {totalReviews}
                        </span>

                      </td>

                      {/* SENTIMENT */}

                      <td className="px-6 py-5">

                        <div className="text-xs space-y-1">

                          <p className="text-green-600">
                            Positive {positivePercentage}%
                          </p>

                          <p className="text-red-600">
                            Negative {negativePercentage}%
                          </p>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          Completed
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-5 text-right">

                        <button
                          onClick={() =>
                            handleViewAnalysis(
                              dataset._id
                            )
                          }
                          className="inline-flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                        >

                          <Eye size={16} />

                          View Analysis

                        </button>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div className="py-16 text-center">

            <p className="text-slate-700 font-medium">
              No analyses found
            </p>

            <p className="text-sm text-slate-500 mt-1">
              {searchTerm
                ? "Try searching with a different file name."
                : "Upload and analyze a feedback file to see it here."}
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default History;