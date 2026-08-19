import { datasets } from "../data/dummyData";

import StatCard from "../components/StatCard";
import SentimentChart from "../components/SentimentChart";
import RecentFeedback from "../components/RecentFeedback";
import IssueCategoryChart from "../components/IssueCategoryChart";


const Dashboard = () => {

  
  const latestDataset = datasets[0];


  if (!latestDataset) {
    return (
      <div className="p-8">

        <h2 className="text-2xl font-bold text-slate-900">
          Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          No analyzed feedback available yet.
        </p>

      </div>
    );
  }


  const { sentiment, categories, reviews } = latestDataset;


  const positivePercentage = (
    (sentiment.positive / latestDataset.totalReviews) * 100
  ).toFixed(1);

  const negativePercentage = (
    (sentiment.negative / latestDataset.totalReviews) * 100
  ).toFixed(1);

  const neutralPercentage = (
    (sentiment.neutral / latestDataset.totalReviews) * 100
  ).toFixed(1);


  return (
    <div className="p-8">


      {/* ================= HEADER ================= */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monitor consumer feedback and sentiment insights.
        </p>

        <p className="text-xs text-slate-400 mt-2">
          Showing latest analysis:{" "}
          <span className="font-medium text-slate-600">
            {latestDataset.fileName}
          </span>
        </p>

      </div>



      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          title="Total Reviews"
          value={latestDataset.totalReviews}
        />

        <StatCard
          title="Positive"
          value={`${positivePercentage}%`}
        />

        <StatCard
          title="Negative"
          value={`${negativePercentage}%`}
        />

        <StatCard
          title="Neutral"
          value={`${neutralPercentage}%`}
        />

      </div>



      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

        <SentimentChart
          sentiment={sentiment}
        />

        <IssueCategoryChart
          categories={categories}
        />

      </div>



      {/* ================= RECENT FEEDBACK ================= */}

      <RecentFeedback
        reviews={reviews}
        datasetId={latestDataset.id}
      />

    </div>
  );
};


export default Dashboard;