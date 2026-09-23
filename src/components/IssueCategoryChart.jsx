import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const IssueCategoryChart = ({ categorySentiment }) => {
  const categoryData = Object.entries(categorySentiment || {}).map(
    ([name, values]) => ({
      name,
      positive: values.positive || 0,
      negative: values.negative || 0,
    })
  );

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
      <div>
        <h3 className="text-lg font-semibold text-[#172033]">
          Consumer Feedback by Category
        </h3>

        <p className="text-sm text-[#64748b] mt-1">
          Positive and negative feedback across consumer areas
        </p>
      </div>

      <div className="flex items-center gap-5 mt-5 text-xs text-[#475569]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#22c55e]" />
          Positive
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#ef4444]" />
          Negative
        </div>
      </div>

      <div className="h-[420px] mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 40,
            }}
            barCategoryGap="18%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="name"
              interval={0}
              angle={-35}
              textAnchor="end"
              height={80}
              tick={{
                fontSize: 11,
                fill: "#475569",
              }}
              axisLine={{
                stroke: "#cbd5e1",
              }}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
              }}
              formatter={(value, name) => [
                value,
                name === "positive" ? "Positive" : "Negative",
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={30}
              formatter={(value) =>
                value === "positive" ? "Positive" : "Negative"
              }
            />

            <Bar
              dataKey="positive"
              name="positive"
              fill="#22c55e"
              radius={[5, 5, 0, 0]}
              barSize={22}
            />

            <Bar
              dataKey="negative"
              name="negative"
              fill="#ef4444"
              radius={[5, 5, 0, 0]}
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssueCategoryChart;