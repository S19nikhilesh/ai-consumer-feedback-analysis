import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const issueData = [
    { name: "Transaction Failure", value: 320 },
    { name: "Customer Support", value: 240 },
    { name: "Login Issue", value: 180 },
    { name: "App Performance", value: 150 },
    { name: "Security", value: 110 },
    { name: "UI / UX", value: 90 },
  ];

  const IssueCategoryChart = () => {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
  
        <h3 className="text-lg font-semibold text-slate-900">
          Common Consumer Issues
        </h3>
  
        <p className="text-sm text-slate-500 mt-1">
          Most frequently reported problems
        </p>
  
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={issueData}>
              <CartesianGrid strokeDasharray="3 3" />
  
              <XAxis dataKey="name" />
  
              <YAxis />
  
              <Tooltip />
  
              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
      </div>
    );
  };
  
export default IssueCategoryChart;