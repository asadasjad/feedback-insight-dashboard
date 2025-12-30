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
    <div className='space-y-6'>
      {/* Insights summary */}
      <div className='bg-slate-900 text-white rounded-3xl p-6'>
        <p className='text-sm uppercase tracking-wide text-slate-300 mb-1'>
          Insights Summary
        </p>
        <p className='text-sm leading-relaxed'>{insight}</p>
      </div>
      {/* Top dashboard grid */}
      <div className='grid gap-4 md:grid-cols-3'>
        <SentimentChart
          sentiment={result.sentiment}
          sentimentCounts={sentimentCounts}
        />

        {/* Complaints */}
        <div className='bg-white  rounded-3xl p-7 shadow-md'>
          <p className='text-sm text-slate-500 mb-2'>Top Complaints</p>

          {result.topComplaints.length === 0 ? (
            <p className='text-sm text-slate-400'>
              No major complaints detected
            </p>
          ) : (
            <ul className='space-y-2 text-sm'>
              {result.topComplaints.map((item) => (
                <li
                  key={item}
                  className='flex justify-between border-b pb-1 capitalize'
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Feature Requests */}
        <div className='bg-white rounded-3xl p-7 shadow-md'>
          <p className='text-sm text-slate-500 mb-2'>Feature Requests</p>

          {result.topFeatureRequests.length === 0 ? (
            <p className='text-sm text-slate-400'>
              No clear feature requests detected
            </p>
          ) : (
            <ul className='space-y-2 text-sm'>
              {result.topFeatureRequests.map((item) => (
                <li
                  key={item}
                  className='flex justify-between border-b pb-1 capitalize'
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
