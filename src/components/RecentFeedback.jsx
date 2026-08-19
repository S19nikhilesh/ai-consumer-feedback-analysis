const RecentFeedback = ({ reviews }) => {

  // Dashboard par sirf latest 4 reviews dikhayenge.
  const recentReviews = reviews.slice(0, 4);


  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">


      {/* ================= HEADER ================= */}

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



      {/* ================= TABLE ================= */}

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-200 text-sm text-slate-500">

              <th className="pb-3 font-medium">
                Review
              </th>

              <th className="pb-3 font-medium">
                Sentiment
              </th>

              <th className="pb-3 font-medium">
                Category
              </th>

            </tr>

          </thead>


          <tbody>

            {recentReviews.map((review) => (

              <tr
                key={review.id}
                className="border-b border-slate-100 last:border-0"
              >

                <td className="py-4 pr-6 text-sm text-slate-700">
                  {review.text}
                </td>


                <td className="py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      review.sentiment === "Positive"
                        ? "bg-green-100 text-green-700"
                        : review.sentiment === "Negative"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {review.sentiment}
                  </span>

                </td>


                <td className="py-4 text-sm text-slate-600">
                  {review.category}
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