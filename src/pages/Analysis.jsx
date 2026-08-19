import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { datasets } from "../data/dummyData";

const Analysis = () => {
  const [searchParams] = useSearchParams();

  const datasetFromUrl = searchParams.get("dataset");
  
  const [selectedDatasetId, setSelectedDatasetId] = useState(
    datasetFromUrl || datasets[0]?.id || ""
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 10;

  const selectedDataset = datasets.find(
    (dataset) => dataset.id === selectedDatasetId
  );

  if (!selectedDataset) {
    return (
      <div className="p-8">
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No Analysis Available
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Upload and analyze a feedback file to view its results.
          </p>
        </div>
      </div>
    );
  }

  const { sentiment, categories, insights, reviews } = selectedDataset;

  const totalReviews = selectedDataset.totalReviews;

  const positivePercentage = Math.round(
    (sentiment.positive / totalReviews) * 100
  );

  const negativePercentage = Math.round(
    (sentiment.negative / totalReviews) * 100
  );

  const neutralPercentage = Math.round(
    (sentiment.neutral / totalReviews) * 100
  );


  /* =====================================================
     POSITIVE / NEGATIVE / NEUTRAL CATEGORY DATA
  ===================================================== */

  const positiveCategories = [...categories]
    .sort((a, b) => b.positive - a.positive)
    .filter((category) => category.positive > 0);

  const negativeCategories = [...categories]
    .sort((a, b) => b.negative - a.negative)
    .filter((category) => category.negative > 0);

  const neutralCategories = [...categories]
    .sort((a, b) => b.neutral - a.neutral)
    .filter((category) => category.neutral > 0);


  /* =====================================================
     FILTER REVIEWS
  ===================================================== */

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {

      const matchesSearch = review.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesSentiment =
        sentimentFilter === "All" ||
        review.sentiment === sentimentFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        review.category === categoryFilter;

      return (
        matchesSearch &&
        matchesSentiment &&
        matchesCategory
      );
    });
  }, [
    reviews,
    searchTerm,
    sentimentFilter,
    categoryFilter,
  ]);


  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.ceil(
    filteredReviews.length / reviewsPerPage
  );

  const startIndex =
    (currentPage - 1) * reviewsPerPage;

  const endIndex =
    startIndex + reviewsPerPage;

  const visibleReviews = filteredReviews.slice(
    startIndex,
    endIndex
  );


  const handleDatasetChange = (event) => {
    setSelectedDatasetId(event.target.value);

    setSearchTerm("");
    setSentimentFilter("All");
    setCategoryFilter("All");
    setCurrentPage(1);
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };


  const handleSentimentChange = (event) => {
    setSentimentFilter(event.target.value);
    setCurrentPage(1);
  };


  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setCurrentPage(1);
  };


  return (
    <div className="p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Detailed Analysis
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Understand what consumers are saying and why.
          </p>
        </div>


        {/* Dataset Selector */}

        <div>
          <label
            htmlFor="dataset"
            className="block text-xs font-medium text-slate-500 mb-2"
          >
            ANALYSIS DATASET
          </label>

          <select
            id="dataset"
            value={selectedDatasetId}
            onChange={handleDatasetChange}
            className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {datasets.map((dataset) => (
              <option
                key={dataset.id}
                value={dataset.id}
              >
                {dataset.fileName}
              </option>
            ))}
          </select>
        </div>

      </div>


      {/* =====================================================
          DATASET HEADER
      ===================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <p className="text-xs font-medium text-slate-500 uppercase">
              Selected Dataset
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-2">
              {selectedDataset.fileName}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {totalReviews} consumer reviews analyzed
            </p>

          </div>


          <span className="w-fit px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            Analysis Complete
          </span>

        </div>

      </div>


      {/* =====================================================
          SENTIMENT ANALYSIS
      ===================================================== */}

      <div className="mt-8">

        <div className="mb-5">

          <h3 className="text-lg font-semibold text-slate-900">
            Sentiment Analysis
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Overall emotional distribution across consumer feedback.
          </p>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* Sentiment Visual */}

          <div className="bg-white border border-slate-200 rounded-xl p-6">

            <h4 className="font-semibold text-slate-900">
              Sentiment Distribution
            </h4>


            <div className="flex flex-col sm:flex-row items-center gap-8 mt-6">


              {/* Donut */}

              <div
                className="h-44 w-44 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(
                    #22c55e 0% ${positivePercentage}%,
                    #94a3b8 ${positivePercentage}% ${
                    positivePercentage + neutralPercentage
                  }%,
                    #ef4444 ${
                      positivePercentage + neutralPercentage
                    }% 100%
                  )`,
                }}
              >

                <div className="h-28 w-28 rounded-full bg-white flex flex-col items-center justify-center">

                  <span className="text-2xl font-bold text-slate-900">
                    {totalReviews}
                  </span>

                  <span className="text-xs text-slate-500">
                    Reviews
                  </span>

                </div>

              </div>


              {/* Legend */}

              <div className="space-y-4">

                <div>
                  <div className="flex items-center gap-2">

                    <span className="h-3 w-3 rounded-full bg-green-500"></span>

                    <span className="text-sm text-slate-600">
                      Positive
                    </span>

                  </div>

                  <p className="text-lg font-semibold text-slate-900 ml-5">
                    {sentiment.positive} ({positivePercentage}%)
                  </p>
                </div>


                <div>
                  <div className="flex items-center gap-2">

                    <span className="h-3 w-3 rounded-full bg-slate-400"></span>

                    <span className="text-sm text-slate-600">
                      Neutral
                    </span>

                  </div>

                  <p className="text-lg font-semibold text-slate-900 ml-5">
                    {sentiment.neutral} ({neutralPercentage}%)
                  </p>
                </div>


                <div>
                  <div className="flex items-center gap-2">

                    <span className="h-3 w-3 rounded-full bg-red-500"></span>

                    <span className="text-sm text-slate-600">
                      Negative
                    </span>

                  </div>

                  <p className="text-lg font-semibold text-slate-900 ml-5">
                    {sentiment.negative} ({negativePercentage}%)
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Sentiment Summary */}

          <div className="bg-white border border-slate-200 rounded-xl p-6">

            <h4 className="font-semibold text-slate-900">
              Sentiment Summary
            </h4>


            <div className="space-y-6 mt-6">


              {/* Positive */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-sm font-medium text-slate-600">
                    Positive
                  </span>

                  <span className="text-sm font-semibold text-green-600">
                    {positivePercentage}%
                  </span>

                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${positivePercentage}%`,
                    }}
                  />

                </div>

              </div>


              {/* Negative */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-sm font-medium text-slate-600">
                    Negative
                  </span>

                  <span className="text-sm font-semibold text-red-600">
                    {negativePercentage}%
                  </span>

                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${negativePercentage}%`,
                    }}
                  />

                </div>

              </div>


              {/* Neutral */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-sm font-medium text-slate-600">
                    Neutral
                  </span>

                  <span className="text-sm font-semibold text-slate-500">
                    {neutralPercentage}%
                  </span>

                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-slate-400 rounded-full"
                    style={{
                      width: `${neutralPercentage}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          POSITIVE / NEGATIVE ANALYSIS
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


        {/* Positive Analysis */}

        <div className="bg-white border border-slate-200 rounded-xl p-6">

          <div className="mb-6">

            <h3 className="text-lg font-semibold text-slate-900">
              Positive Feedback Analysis
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Issues and areas receiving the most positive feedback.
            </p>

          </div>


          <div className="space-y-5">

            {positiveCategories.map((category) => {

              const maxValue =
                positiveCategories[0]?.positive || 1;

              const width =
                (category.positive / maxValue) * 100;

              return (
                <div key={category.name}>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-slate-700">
                      {category.name}
                    </span>

                    <span className="text-sm font-semibold text-green-600">
                      {category.positive}
                    </span>

                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${width}%`,
                      }}
                    />

                  </div>

                </div>
              );

            })}

          </div>

        </div>


        {/* Negative Analysis */}

        <div className="bg-white border border-slate-200 rounded-xl p-6">

          <div className="mb-6">

            <h3 className="text-lg font-semibold text-slate-900">
              Negative Feedback Analysis
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Issues generating the highest amount of negative feedback.
            </p>

          </div>


          <div className="space-y-5">

            {negativeCategories.map((category) => {

              const maxValue =
                negativeCategories[0]?.negative || 1;

              const width =
                (category.negative / maxValue) * 100;

              return (
                <div key={category.name}>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-slate-700">
                      {category.name}
                    </span>

                    <span className="text-sm font-semibold text-red-600">
                      {category.negative}
                    </span>

                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${width}%`,
                      }}
                    />

                  </div>

                </div>
              );

            })}

          </div>

        </div>

      </div>


      {/* =====================================================
          NEUTRAL ANALYSIS
      ===================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">

        <div className="mb-6">

          <h3 className="text-lg font-semibold text-slate-900">
            Neutral Feedback Analysis
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Categories containing informational or mixed feedback.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {neutralCategories.map((category) => (

            <div
              key={category.name}
              className="border border-slate-200 rounded-lg p-4"
            >

              <p className="text-sm font-medium text-slate-700">
                {category.name}
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {category.neutral}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                neutral reviews
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          CATEGORY × SENTIMENT
      ===================================================== */}

     {/* ================= CATEGORY × SENTIMENT ================= */}

<div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">

<div className="mb-6">

  <h3 className="text-lg font-semibold text-slate-900">
    Category × Sentiment Analysis
  </h3>

  <p className="text-sm text-slate-500 mt-1">
    Compare positive, neutral, and negative feedback across issue categories.
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

      {categories.map((category) => {

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


            <td className="py-4 text-sm text-center text-slate-700">
              {category.positive}
            </td>


            <td className="py-4 text-sm text-center text-slate-700">
              {category.neutral}
            </td>


            <td className="py-4 text-sm text-center text-slate-700">
              {category.negative}
            </td>


            <td className="py-4 text-sm text-center font-semibold text-slate-900">
              {total}
            </td>

          </tr>

        );

      })}

    </tbody>

  </table>

</div>

</div>


      {/* =====================================================
          AI INSIGHTS
      ===================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">

        <div className="mb-5">

          <h3 className="text-lg font-semibold text-slate-900">
            AI Generated Insights
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Important findings identified from the analyzed feedback.
          </p>

        </div>


        <div className="space-y-3">

          {insights.map((insight, index) => (

            <div
              key={index}
              className="flex gap-3 bg-slate-50 border border-slate-100 rounded-lg p-4"
            >

              <span className="text-blue-600 font-bold">
                {index + 1}.
              </span>

              <p className="text-sm text-slate-700">
                {insight}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          REVIEW EXPLORER
      ===================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">

        <div className="mb-6">

          <h3 className="text-lg font-semibold text-slate-900">
            Review Explorer
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Search and filter individual analyzed consumer reviews.
          </p>

        </div>


        {/* Filters */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">


          {/* Search */}

          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />


          {/* Sentiment */}

          <select
            value={sentimentFilter}
            onChange={handleSentimentChange}
            className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="All">
              All Sentiments
            </option>

            <option value="Positive">
              Positive
            </option>

            <option value="Negative">
              Negative
            </option>

            <option value="Neutral">
              Neutral
            </option>

          </select>


          {/* Category */}

          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="All">
              All Categories
            </option>

            {categories.map((category) => (

              <option
                key={category.name}
                value={category.name}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>


        {/* Review Count */}

        <div className="flex items-center justify-between mb-4">

          <p className="text-xs text-slate-500">

            Showing{" "}
            {filteredReviews.length === 0
              ? 0
              : startIndex + 1}
            –
            {Math.min(endIndex, filteredReviews.length)}{" "}
            of {filteredReviews.length} reviews

          </p>

        </div>


        {/* Review Table */}

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

              {visibleReviews.length > 0 ? (

                visibleReviews.map((review) => (

                  <tr
                    key={review.id}
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

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="py-10 text-center text-sm text-slate-500"
                  >
                    No reviews match your filters.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Pagination */}

        {totalPages > 1 && (

          <div className="flex items-center justify-between mt-6">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              ← Previous
            </button>


            <div className="text-sm text-slate-500">

              Page{" "}
              <span className="font-medium text-slate-900">
                {currentPage}
              </span>{" "}
              of {totalPages}

            </div>


            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next →
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default Analysis;