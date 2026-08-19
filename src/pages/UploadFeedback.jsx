import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import {useNavigate} from "react-router-dom"



const UploadFeedback = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  
  const  handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="p-8">

      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Upload Consumer Feedback
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Upload a CSV file containing consumer reviews for AI analysis.
        </p>
      </div>


      <div className="max-w-3xl">

        {/* Upload Box */}
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">

          <div className="h-14 w-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            <Upload className="text-blue-600" size={26} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            Upload your CSV file
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Drag and drop your file here or browse from your computer.
          </p>


          {/* Hidden File Input */}
          <input
            type="file"
            accept=".csv"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />


          {/* Browse Button */}
          <label
            htmlFor="fileInput"
            className="inline-block mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
          >
            Browse Files
          </label>


          <p className="text-xs text-slate-400 mt-4">
            CSV files only · Maximum size 10 MB
          </p>

        </div>


        {/* Selected File */}
        {file && (
          <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="text-blue-600" size={20} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {file.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

              </div>


              {/* Remove File */}
              <button
                onClick={removeFile}
                className="p-2 text-slate-400 hover:text-red-500 transition"
              >
                <X size={18} />
              </button>

            </div>


            {/* Analyze Button */}
            <button
              disabled={!file} onClick={() => navigate("/analysis/processing")}
              className="w-full mt-5 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze Feedback
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default UploadFeedback;