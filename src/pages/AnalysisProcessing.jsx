import { useEffect, useState } from "react";
import { Brain, CheckCircle2 } from "lucide-react";

const AnalysisProcessing = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const isCompleted = progress === 100;

  return (
    <div className="p-8">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">

          {/* Icon */}
          <div className="h-16 w-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            {isCompleted ? (
              <CheckCircle2 className="text-green-600" size={32} />
            ) : (
              <Brain className="text-blue-600" size={32} />
            )}
          </div>

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
            August_Feedback.csv
          </div>

          {/* Progress */}
          <div className="mt-6">

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>{progress}% completed</span>
              <span>
                {Math.round((progress / 100) * 1200)} / 1200 reviews
              </span>
            </div>

          </div>

          {/* Status */}
          <div className="mt-8 text-sm text-slate-500">
            {isCompleted
              ? "Analysis ready to view."
              : "Please wait while the feedback is being processed..."}
          </div>

        </div>

      </div>

    </div>
  );
};

export default AnalysisProcessing;