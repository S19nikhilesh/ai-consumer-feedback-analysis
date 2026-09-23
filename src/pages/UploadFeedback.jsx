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

  /* ================= FILE VALIDATION ================= */

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

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  /* ================= DRAG & DROP ================= */

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();

    dragCounter.current -= 1;

    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    dragCounter.current = 0;
    setIsDragging(false);

    if (loading) return;

    validateAndSetFile(e.dataTransfer.files[0]);
  };

  /* ================= REMOVE FILE ================= */

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  /* ================= ANALYZE ================= */

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

      localStorage.setItem(
        "latestDataset",
        JSON.stringify(data)
      );

      navigate("/analysis/processing", {
        state: {
          datasetId: data.datasetId,
        },
      });
    } catch (error) {
      setError(
        error.message || "Failed to analyze feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#172033]">

      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Feedback Analysis
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#172033] sm:text-[28px]">
            Upload Consumer Feedback
          </h2>

          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#64748b]">
            Upload a CSV file containing consumer reviews and
            let the system analyze the feedback using AI.
          </p>

        </div>


        {/* ================= UPLOAD BOX ================= */}

        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`rounded-xl border border-dashed bg-white px-6 py-14 text-center transition-colors ${
            isDragging
              ? "border-[#416f9f] bg-[#f1f6fb]"
              : "border-[#cbd5e1]"
          }`}
        >

          {/* Upload Icon */}

          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl border transition-colors ${
              isDragging
                ? "border-[#8aa9c7] bg-[#eaf2f9]"
                : "border-[#dbe3eb] bg-[#f8fafc]"
            }`}
          >

            <Upload
              size={22}
              className="text-[#416f9f]"
              strokeWidth={1.9}
            />

          </div>


          <h3 className="mt-5 text-base font-semibold text-[#172033]">
            {isDragging
              ? "Drop your file here"
              : "Upload your CSV file"}
          </h3>


          <p className="mt-2 text-sm text-[#64748b]">
            Drag and drop your file here or browse from your computer.
          </p>


          {/* File Input */}

          <input
            type="file"
            accept=".csv"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />


          <label
            htmlFor="fileInput"
            className="mt-6 inline-flex cursor-pointer items-center rounded-lg bg-[#315f8f] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#274e76]"
          >
            Browse Files
          </label>


          <p className="mt-5 text-xs text-[#94a3b8]">
            CSV files only · Maximum size 5 MB
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mt-4 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
            {error}
          </div>
        )}


        {/* ================= SELECTED FILE ================= */}

        {file && (

          <div className="mt-6 overflow-hidden rounded-xl border border-[#dbe3eb] bg-white">

            {/* File Information */}

            <div className="flex items-center justify-between p-5">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff]">
                  <FileText
                    size={18}
                    className="text-[#416f9f]"
                  />
                </div>


                <div className="min-w-0">

                  <p className="truncate text-sm font-medium text-[#172033]">
                    {file.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#64748b]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={removeFile}
                disabled={loading}
                aria-label="Remove file"
                className="rounded-md p-1.5 text-[#64748b] transition-colors hover:bg-[#fef2f2] hover:text-[#b91c1c] disabled:opacity-50"
              >
                <X size={17} />
              </button>

            </div>


            {/* Analyze */}

            <div className="border-t border-[#e2e8f0] bg-[#f8fafc] p-4">

              <button
                type="button"
                disabled={!file || loading}
                onClick={handleAnalyze}
                className="w-full rounded-lg bg-[#315f8f] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#274e76] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Analyzing Feedback..."
                  : "Analyze Feedback"}
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default UploadFeedback;