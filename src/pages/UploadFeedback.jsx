import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { uploadCSV } from "../services/api";

const UploadFeedback = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const navigate = useNavigate();

  /* ---------- Original logic (unchanged) ---------- */
  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    setError("");

    if (
      selectedFile.type !== "text/csv" &&
      !selectedFile.name.toLowerCase().endsWith(".csv")
    ) {
      setError("Please select a CSV file.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }
    setFile(selectedFile);
  };

  const handleFileChange = (e) => validateAndSetFile(e.target.files[0]);

  /* ---------- Drag & Drop ---------- */
  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    if (loading) return;
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!file) return;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await uploadCSV(file, token);
      localStorage.setItem("latestDataset", JSON.stringify(data));
      navigate("/analysis/processing", {
        state: { datasetId: data.datasetId },
      });
    } catch (error) {
      setError(error.message || "Failed to analyze feedback.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-[#F3F5F5] text-[#202526]">
      <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
            Upload Consumer Feedback
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[#6B7475]">
            Upload a CSV file containing consumer reviews for AI analysis.
          </p>
        </div>

        {/* Upload box */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`rounded-xl border border-dashed bg-[#FFFFFF] px-6 py-12 text-center transition-colors
            ${
              isDragging
                ? "border-[#287C78] bg-[#E6F1F0]"
                : "border-[#DDE3E3]"
            }`}
        >
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border transition-colors
              ${
                isDragging
                  ? "border-[#287C78] bg-[#E6F1F0]"
                  : "border-[#DDE3E3] bg-[#F3F5F5]"
              }`}
          >
            <Upload size={20} className="text-[#1D5E5A]" />
          </div>

          <h3 className="mt-5 text-base font-medium text-[#202526]">
            {isDragging ? "Drop your file here" : "Upload your CSV file"}
          </h3>

          <p className="mt-1.5 text-sm text-[#6B7475]">
            Drag and drop your file here or browse from your computer.
          </p>

          <input
            type="file"
            accept=".csv"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="fileInput"
            className="mt-6 inline-block cursor-pointer rounded-lg bg-[#287C78] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1D5E5A]"
          >
            Browse Files
          </label>

          <p className="mt-5 text-xs text-[#6B7475]">
            CSV files only · Maximum size 5 MB
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-[#E5C5BE] bg-[#F7E7E2] px-4 py-3 text-sm text-[#8A3A2A]">
            {error}
          </div>
        )}

        {/* Selected file */}
        {file && (
          <div className="mt-6 rounded-xl border border-[#DDE3E3] bg-[#FFFFFF]">

            <div className="flex items-center justify-between p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F5F5]">
                  <FileText size={18} className="text-[#1D5E5A]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#202526]">
                    {file.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6B7475]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                disabled={loading}
                aria-label="Remove file"
                className="rounded-md p-1.5 text-[#6B7475] transition-colors hover:bg-[#F7E7E2] hover:text-[#8A3A2A] disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </div>

            <div className="border-t border-[#DDE3E3] p-4">
              <button
                type="button"
                disabled={!file || loading}
                onClick={handleAnalyze}
                className="w-full rounded-lg bg-[#287C78] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D5E5A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing Feedback..." : "Analyze Feedback"}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default UploadFeedback;