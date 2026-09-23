import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Trash2 } from "lucide-react";

import { getDatasets, deleteDataset } from "../services/api";

const History = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

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
  // DELETE DATASET
  // =====================================================

  const handleDelete = async (datasetId, fileName) => {
    const confirmed = window.confirm(
      `Delete "${fileName}"?\n\nThis will permanently remove the dataset and its analyzed reviews.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      setDeletingId(datasetId);
      setDeleteError("");

      await deleteDataset(datasetId, token);

      setDatasets((prevDatasets) =>
        prevDatasets.filter(
          (dataset) => dataset._id !== datasetId
        )
      );
    } catch (error) {
      console.error("Failed to delete dataset:", error);

      setDeleteError(
        error.message || "Failed to delete dataset."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="p-8 bg-[#f8fafc] min-h-[calc(100vh-76px)]">
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold text-[#172033]">
            Loading Analysis History...
          </h2>

          <p className="text-sm text-[#64748b] mt-2">
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
      <div className="p-8 bg-[#f8fafc] min-h-[calc(100vh-76px)]">
        <div className="bg-white border border-red-200 rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to Load History
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
  // UI
  // =====================================================

  return (
    <div className="p-8 bg-[#f8fafc] min-h-[calc(100vh-76px)]">

      {/* ================= HEADER ================= */}

      <div className="mb-7">
        <h2 className="text-2xl font-semibold text-[#172033]">
          Analysis History
        </h2>

        <p className="text-sm text-[#64748b] mt-1.5">
          View and manage your previous feedback analyses.
        </p>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 mb-5">
        <div className="relative max-w-md">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />

          <input
            type="text"
            placeholder="Search by file name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#172033] placeholder:text-[#94a3b8] outline-none focus:border-[#315f8f] focus:ring-2 focus:ring-[#315f8f]/10"
          />
        </div>
      </div>

      {/* ================= DELETE ERROR ================= */}

      {deleteError && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {deleteError}
        </div>
      )}

      {/* ================= HISTORY TABLE ================= */}

      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">

        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-lg font-semibold text-[#172033]">
            Previous Analyses
          </h3>

          <p className="text-sm text-[#64748b] mt-1">
            {filteredDatasets.length} analysis
            {filteredDatasets.length !== 1 ? "es" : ""} found
          </p>
        </div>

        {filteredDatasets.length > 0 ? (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-[#e2e8f0] text-xs uppercase tracking-wide text-[#64748b]">

                  <th className="px-6 py-4 font-semibold">
                    File
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Uploaded
                  </th>

                  <th className="px-6 py-4 font-semibold text-center">
                    Reviews
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Sentiment
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 font-semibold text-right">
                    Actions
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

                  const isDeleting =
                    deletingId === dataset._id;

                  return (
                    <tr
                      key={dataset._id}
                      className="border-b border-[#f1f5f9] last:border-none hover:bg-[#f8fafc] transition"
                    >

                      {/* FILE */}

                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm font-medium text-[#172033]">
                            {dataset.fileName}
                          </p>

                          <p className="text-xs text-[#94a3b8] mt-1">
                            {dataset._id}
                          </p>
                        </div>
                      </td>

                      {/* DATE */}

                      <td className="px-6 py-5">
                        <p className="text-sm text-[#475569]">
                          {uploadedDate}
                        </p>
                      </td>

                      {/* REVIEWS */}

                      <td className="px-6 py-5 text-center">
                        <span className="text-sm font-medium text-[#334155]">
                          {totalReviews}
                        </span>
                      </td>

                      {/* SENTIMENT */}

                      <td className="px-6 py-5">
                        <div className="text-xs space-y-1">
                          <p className="text-green-600">
                            Positive {positivePercentage}%
                          </p>

                          <p className="text-red-500">
                            Negative {negativePercentage}%
                          </p>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">
                        <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 text-xs font-medium">
                          Completed
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">

                          <button
                            onClick={() =>
                              handleViewAnalysis(
                                dataset._id
                              )
                            }
                            className="inline-flex items-center gap-2 px-3 py-2 border border-[#cbd5e1] rounded-lg text-sm font-medium text-[#334155] hover:bg-[#f8fafc] hover:border-[#94a3b8] transition"
                          >
                            <Eye size={15} />
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                dataset._id,
                                dataset.fileName
                              )
                            }
                            disabled={isDeleting}
                            className="inline-flex items-center gap-2 px-3 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={15} />

                            {isDeleting
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>
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
            <p className="text-[#334155] font-medium">
              No analyses found
            </p>

            <p className="text-sm text-[#64748b] mt-1">
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