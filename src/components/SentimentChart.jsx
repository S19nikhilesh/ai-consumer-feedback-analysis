import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const sentimentData = [
    { name: "Positive", value: 62.3 },
    { name: "Negative", value: 25.1 },
    { name: "Neutral", value: 12.6 },
  ];
  
  const COLORS = ["#22c55e", "#ef4444", "#94a3b8"];
  
  const SentimentChart = () => {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        
        <h3 className="text-lg font-semibold text-slate-900">
          Sentiment Distribution
        </h3>
  
        <p className="text-sm text-slate-500 mt-1">
          Overall sentiment of consumer feedback
        </p>
  
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
  
      </div>
    );
  };
  
  export default SentimentChart;