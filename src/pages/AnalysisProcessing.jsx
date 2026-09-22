import { useEffect, useState } from "react";
import { Brain, CheckCircle2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatasetById } from "../services/api";

const AnalysisProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [progress, setProgress] = useState(0);
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState("");

  const datasetId = location.state?.datasetId;

  useEffect(() => {
    const processDataset = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        if (!datasetId) {
          setError("Dataset information is missing.");
          return;
        }

        // Fetch the dataset that was just analyzed
        const data = await getDatasetById(datasetId, token);

        setDataset(data.dataset);

        // Small visual progress animation
        let currentProgress = 0;

        const interval = setInterval(() => {
          currentProgress += 10;

          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);

            setTimeout(() => {
              navigate("/analysis", {
                state: {
                  datasetId: data.dataset._id,
                },
              });
            }, 700);
          }

          setProgress(currentProgress);
        }, 100);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Dataset processing error:", error);

        setError(
          error.message || "Failed to load analysis results."
        );
      }
    };

    processDataset();
  }, [datasetId, navigate]);

  const isCompleted = progress === 100;

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">

          {/* Icon */}
          <div className="h-16 w-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            {isCompleted ? (
              <CheckCircle2
                className="text-green-600"
                size={32}
              />
            ) : (
              <Brain
                className="text-blue-600"
                size={32}
              />
            )}
          </div>

          {/* Error */}
          {error ? (
            <>
              <h2 className="text-2xl font-bold text-red-600 mt-6">
                Analysis Failed
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {error}
              </p>

              <button
                onClick={() => navigate("/upload")}
                className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Back to Upload
              </button>
            </>
          ) : (
            <>
              {/* Heading */}
              <h2 className="text-2xl font-bold text-slate-900 mt-6">
                {isCompleted
                  ? "Analysis Completed"
                  : "Analyzing Consumer Feedback..."}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {isCompleted
                  ? "Your feedback has been successfully analyzed."
                  : "AI is analyzing sentiment and identifying consumer issues."}
              </p>

              {/* File Name */}
              <div className="mt-6 text-sm font-medium text-slate-700">
                {dataset?.fileName || "Loading dataset..."}
              </div>

              {/* Progress */}
              <div className="mt-6">

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>
                    {progress}% completed
                  </span>

                  <span>
                    {dataset
                      ? `${Math.round(
                          (progress / 100) *
                            dataset.totalReviews
                        )} / ${dataset.totalReviews} reviews`
                      : "Loading..."}
                  </span>
                </div>

              </div>

              {/* Status */}
              <div className="mt-8 text-sm text-slate-500">
                {isCompleted
                  ? "Analysis ready to view."
                  : "Please wait while the feedback is being processed..."}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default AnalysisProcessing;