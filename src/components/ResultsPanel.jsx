import SentimentChart from './SentimentChart'

/**
 * Generates a human-readable insights summary
 */
function generateInsights({ sentiment, topComplaints, topFeatureRequests }) {
  if (sentiment === 'negative' && topComplaints.length > 0) {
    return `Users are experiencing recurring issues, especially around "${topComplaints[0]}". Addressing this should be the top priority before shipping new features.`
  }

  if (sentiment === 'neutral' && topFeatureRequests.length > 0) {
    return `Feedback is mixed. Users are asking for features like "${topFeatureRequests[0]}". Improving this could significantly boost satisfaction.`
  }

  if (sentiment === 'positive') {
    return `Overall sentiment is positive. Focus on polishing existing features and selectively addressing requests such as "${
      topFeatureRequests[0] || 'minor improvements'
    }".`
  }

  return 'Not enough data to generate clear insights yet.'
}

export default function ResultsPanel({ result, sentimentCounts }) {
  const insight = generateInsights(result)

  return (
    <div className='space-y-16'>
      {/* Insights summary */}
      <div className='bg-slate-900 text-white rounded-3xl p-7'>
        <p className='text-sm uppercase tracking-wide text-slate-300 mb-1'>
          Insights Summary
        </p>
        <p className='text-sm leading-relaxed'>{insight}</p>
      </div>
      {/* Top dashboard grid */}
      <div className='grid gap-8 md:grid-cols-3'>
        <SentimentChart
          sentiment={result.sentiment}
          sentimentCounts={sentimentCounts}
        />

        {/* Complaints */}
        <div className="bg-white rounded-3xl p-7 shadow-sm">
  <p className="text-sm text-slate-500 mb-3">
    Top Complaints
  </p>

  {result.topComplaints.length === 0 ? (
    <p className="text-sm text-slate-400">
      No major complaints detected
    </p>
  ) : (
    <ul className="space-y-2">
      {result.topComplaints.map((item, index) => (
        <li
          key={item}
          className={`
            flex items-center justify-between
            rounded-xl px-3 py-2
            text-sm capitalize
            ${
              index === 0
                ? "bg-red-50 text-red-700 font-medium"
                : "bg-slate-50 text-slate-700"
            }
          `}
        >
          {item}
        </li>
      ))}
    </ul>
  )}
</div>


        {/* Feature Requests */}
        <div className="bg-white rounded-3xl p-7 shadow-sm">
  <p className="text-sm text-slate-500 mb-3">
    Feature Requests
  </p>

  {result.topFeatureRequests.length === 0 ? (
    <p className="text-sm text-slate-400">
      No clear feature requests detected
    </p>
  ) : (
    <ul className="space-y-2">
      {result.topFeatureRequests.map((item, index) => (
        <li
          key={item}
          className={`
            flex items-center justify-between
            rounded-xl px-3 py-2
            text-sm capitalize
            ${
              index === 0
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "bg-slate-50 text-slate-700"
            }
          `}
        >
          {item}
        </li>
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  )
}
