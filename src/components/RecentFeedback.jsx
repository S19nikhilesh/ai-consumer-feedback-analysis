const feedbackData = [
    {
      review: "Payment failed but money was deducted",
      sentiment: "Negative",
      category: "Transaction Failure",
    },
    {
      review: "The app is very easy and smooth to use",
      sentiment: "Positive",
      category: "UI/UX",
    },
    {
      review: "Customer support took too long to respond",
      sentiment: "Negative",
      category: "Customer Support",
    },
    {
      review: "I had to try several times to login",
      sentiment: "Negative",
      category: "Login Issue",
    },
  ];
  
  const RecentFeedback = () => {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">
  
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Consumer Feedback
            </h3>
  
            <p className="text-sm text-slate-500 mt-1">
              Latest analyzed consumer reviews
            </p>
          </div>
  
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full text-left">
  
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="pb-3 font-medium">Review</th>
                <th className="pb-3 font-medium">Sentiment</th>
                <th className="pb-3 font-medium">Category</th>
              </tr>
            </thead>
  
            <tbody>
              {feedbackData.map((feedback, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 pr-6 text-sm text-slate-700">
                    {feedback.review}
                  </td>
  
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        feedback.sentiment === "Positive"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {feedback.sentiment}
                    </span>
                  </td>
  
                  <td className="py-4 text-sm text-slate-600">
                    {feedback.category}
                  </td>
                </tr>
              ))}
            </tbody>
  
          </table>
        </div>
  
      </div>
    );
  };
  
  export default RecentFeedback;