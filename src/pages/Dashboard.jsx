import StatCard from "../components/StatCard";
import SentimentChart from "../components/SentimentChart";
import RecentFeedback from "../components/RecentFeedback";
import IssueCategoryChart from "../components/IssueCategoryChart";

const Dashboard = () => {
  return (
    <div className="p-8">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monitor consumer feedback and sentiment insights.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">

        <StatCard title="Total Reviews" value="1,248" />
        <StatCard title="Positive" value="62.3%" />
        <StatCard title="Negative" value="25.1%" />
        <StatCard title="Neutral" value="12.6%" />

      </div>
    
    <div className="grid grid-cols-2 gap-5 mt-6">
        <SentimentChart />
        <IssueCategoryChart/>
    </div>
    <RecentFeedback />
    </div>
  );
};

export default Dashboard;