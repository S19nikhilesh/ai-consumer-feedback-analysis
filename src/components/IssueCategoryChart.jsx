import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const IssueCategoryChart = ({ categories }) => {

  const issueData = categories.map((category) => ({

    name: category.name,

    value:
      category.positive +
      category.neutral +
      category.negative,

  }));


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

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
            />

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