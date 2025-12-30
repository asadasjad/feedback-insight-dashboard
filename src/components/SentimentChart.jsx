import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

/**
 * Maps sentiment to visual colors
 */
const COLORS = {
  positive: "#4bea68", // your green (kept)
  neutral: "#E5E7EB",  // gray-200
  negative: "#FECACA", // red-200
};

export default function SentimentChart({ sentiment, sentimentCounts }) {
  const data = [
    { key: "positive", value: sentimentCounts.positive },
    { key: "neutral", value: sentimentCounts.neutral },
    { key: "negative", value: sentimentCounts.negative },
  ];

  const hasData = data.some((d) => d.value > 0);
  if (!hasData) return null;

  return (
    <div className="bg-white rounded-3xl p-7 shadow-md">
      <p className="text-sm text-slate-500 mb-2">
        Sentiment Distribution
      </p>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={80}
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={COLORS[entry.key]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <p className="text-center text-sm mt-2 capitalize font-medium">
        Overall: {sentiment}
      </p>
    </div>
  );
}
