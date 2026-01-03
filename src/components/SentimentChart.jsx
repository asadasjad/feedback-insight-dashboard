import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

/**
 * Maps sentiment to visual colors
 */
const COLORS = {
  positive: "#4bea68",
  neutral: "#E5E7EB",
  negative: "#FECACA",
};

export default function SentimentChart({ sentiment, sentimentCounts }) {
  const data = [
    { key: "positive", label: "Positive", value: sentimentCounts.positive },
    { key: "neutral", label: "Neutral", value: sentimentCounts.neutral },
    { key: "negative", label: "Negative", value: sentimentCounts.negative },
  ];

  const hasData = data.some((d) => d.value > 0);
  if (!hasData) return null;

  return (
    <div className="bg-white rounded-3xl p-7 shadow-sm">
      <p className="text-sm text-slate-500 mb-3">
        Sentiment Distribution
      </p>

      <div className="h-40 mb-3">
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

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs text-slate-600 mb-2">
        {data.map((item) => (
          <div key={item.key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLORS[item.key] }}
            />
            {item.label}
          </div>
        ))}
      </div>

      {/* Overall sentiment */}
      <p className="text-center text-sm font-medium text-slate-700 capitalize">
        Overall sentiment:{" "}
        <span className="font-semibold">{sentiment}</span>
      </p>
    </div>
  );
}
