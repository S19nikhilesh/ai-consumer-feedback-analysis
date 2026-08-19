import { analysisData } from "../data/dummyData";

const Analysis = () => {
  return (
    <div className="p-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Detailed Analysis
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Explore detailed insights and patterns from consumer feedback.
          </p>
        </div>


        {/* ================= DATASET DROPDOWN ================= */}
        <div>
          <label
            htmlFor="dataset"
            className="block text-xs font-medium text-slate-500 mb-2"
          >
            ANALYSIS DATASET
          </label>

          <select
            id="dataset"
            className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>{analysisData.fileName}</option>
            <option>July_Feedback.csv</option>
            <option>June_Feedback.csv</option>
          </select>
        </div>

      </div>


      {/* ================= DATASET INFO ================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">
              Selected Dataset
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-2">
              {analysisData.fileName}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {analysisData.totalReviews} reviews analyzed
            </p>
          </div>


          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            Analysis Complete
          </span>

        </div>

      </div>


      {/* ================= SENTIMENT OVERVIEW ================= */}
      <div className="mt-6">

        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Sentiment Overview
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Overall distribution of consumer sentiment.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


          {/* POSITIVE */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-slate-500">
                Positive
              </p>

              <span className="text-xs font-medium text-green-600">
                {Math.round(
                  (analysisData.sentiment.positive /
                    analysisData.totalReviews) *
                    100
                )}%
              </span>

            </div>


            <h4 className="text-3xl font-bold text-slate-900 mt-3">
              {analysisData.sentiment.positive}
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              positive reviews
            </p>

          </div>


          {/* NEGATIVE */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-slate-500">
                Negative
              </p>

              <span className="text-xs font-medium text-red-600">
                {Math.round(
                  (analysisData.sentiment.negative /
                    analysisData.totalReviews) *
                    100
                )}%
              </span>

            </div>


            <h4 className="text-3xl font-bold text-slate-900 mt-3">
              {analysisData.sentiment.negative}
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              negative reviews
            </p>

          </div>


          {/* NEUTRAL */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-slate-500">
                Neutral
              </p>

              <span className="text-xs font-medium text-slate-500">
                {Math.round(
                  (analysisData.sentiment.neutral /
                    analysisData.totalReviews) *
                    100
                )}%
              </span>

            </div>


            <h4 className="text-3xl font-bold text-slate-900 mt-3">
              {analysisData.sentiment.neutral}
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              neutral reviews
            </p>

          </div>

        </div>

      </div>


      {/* ================= SENTIMENT BY CATEGORY ================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">

        <div className="mb-6">

          <h3 className="text-lg font-semibold text-slate-900">
            Sentiment by Issue Category
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Understand which issues are driving different types of sentiment.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b border-slate-200 text-sm text-slate-500">

                <th className="pb-3 font-medium">
                  Issue Category
                </th>

                <th className="pb-3 font-medium text-center">
                  Positive
                </th>

                <th className="pb-3 font-medium text-center">
                  Neutral
                </th>

                <th className="pb-3 font-medium text-center">
                  Negative
                </th>

                <th className="pb-3 font-medium text-center">
                  Total
                </th>

              </tr>

            </thead>


            <tbody>

              {analysisData.categories.map((category) => {

                const total =
                  category.positive +
                  category.neutral +
                  category.negative;

                return (
                  <tr
                    key={category.name}
                    className="border-b border-slate-100 last:border-none"
                  >

                    <td className="py-4 text-sm font-medium text-slate-700">
                      {category.name}
                    </td>

                    <td className="py-4 text-sm text-center text-green-600">
                      {category.positive}
                    </td>

                    <td className="py-4 text-sm text-center text-slate-500">
                      {category.neutral}
                    </td>

                    <td className="py-4 text-sm text-center text-red-600">
                      {category.negative}
                    </td>

                    <td className="py-4 text-sm text-center font-medium text-slate-700">
                      {total}
                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================= AI INSIGHTS ================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">

        <div className="mb-5">

          <h3 className="text-lg font-semibold text-slate-900">
            AI Insights
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Key findings generated from the analyzed feedback.
          </p>

        </div>


        <div className="space-y-3">

          {analysisData.insights.map((insight, index) => (

            <div
              key={index}
              className="bg-slate-50 border border-slate-100 rounded-lg p-4"
            >

              <p className="text-sm text-slate-700">
                {insight}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* ================= ANALYZED REVIEWS ================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">

        <div className="mb-5">

          <h3 className="text-lg font-semibold text-slate-900">
            Analyzed Reviews
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Individual reviews with their AI-generated classification.
          </p>

        </div>


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

              {analysisData.reviews.map((review, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-none"
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

    </div>
  );
};

export default Analysis;