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

  const renderSignalList = ({ items, emptyText, tone }) => {
    const isComplaint = tone === 'complaint'

    return (
      <div className='mt-7'>
        {items.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center'>
            <p className='text-sm text-slate-400'>{emptyText}</p>
          </div>
        ) : (
          <ol className='space-y-1'>
            {items.map((item, index) => (
              <li
                key={item}
                className='group grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-slate-100 py-4 last:border-b-0'
              >
                <span className='text-[10px] tabular-nums text-slate-300'>
                  0{index + 1}
                </span>

                <span className='text-sm font-medium capitalize text-slate-700 transition-colors group-hover:text-slate-950'>
                  {item}
                </span>

                {index === 0 && (
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                      isComplaint
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    {isComplaint ? 'Priority' : 'Top ask'}
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    )
  }

  return (
    <div className='space-y-6 sm:space-y-8'>
      {/* Decision summary */}
      <section className='relative overflow-hidden rounded-[1.75rem] bg-slate-950 px-6 py-7 sm:px-8 sm:py-9 text-white shadow-xl shadow-slate-950/10'>
        <div className='pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-indigo-500/25 blur-3xl' />

        <div className='relative grid gap-7 lg:grid-cols-[0.34fr_1.66fr] lg:items-start'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-300'>
              Decision brief
            </p>
            <p className='mt-2 text-xs text-slate-500'>
              What deserves attention now
            </p>
          </div>

          <p className='max-w-4xl text-lg sm:text-xl lg:text-2xl leading-[1.45] tracking-[-0.025em] text-slate-100'>
            {insight}
          </p>
        </div>
      </section>

      {/* Analysis composition */}
      <div className='grid gap-5 sm:gap-6 lg:grid-cols-12 lg:items-stretch'>
        <section className='lg:col-span-5 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 sm:p-6 shadow-xl shadow-slate-950/[0.04] backdrop-blur-sm'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600'>
                Sentiment
              </p>
              <h3 className='mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950'>
                How the feedback feels
              </h3>
            </div>

            <span className='rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500'>
              Overall
            </span>
          </div>

          <div className='mt-6 min-h-[18rem]'>
            <SentimentChart
              sentiment={result.sentiment}
              sentimentCounts={sentimentCounts}
            />
          </div>
        </section>

        <div className='lg:col-span-7 grid gap-5 sm:gap-6 sm:grid-cols-2'>
          <section className='rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 sm:p-6 shadow-xl shadow-slate-950/[0.04] backdrop-blur-sm'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-500'>
                  Friction
                </p>
                <h3 className='mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950'>
                  Recurring complaints
                </h3>
              </div>
              <span className='text-xs tabular-nums text-slate-300'>
                {String(result.topComplaints.length).padStart(2, '0')}
              </span>
            </div>

            {renderSignalList({
              items: result.topComplaints,
              emptyText: 'No major complaints detected',
              tone: 'complaint',
            })}
          </section>

          <section className='sm:translate-y-8 rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 sm:p-6 shadow-xl shadow-slate-950/[0.04] backdrop-blur-sm'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600'>
                  Opportunity
                </p>
                <h3 className='mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950'>
                  Feature requests
                </h3>
              </div>
              <span className='text-xs tabular-nums text-slate-300'>
                {String(result.topFeatureRequests.length).padStart(2, '0')}
              </span>
            </div>

            {renderSignalList({
              items: result.topFeatureRequests,
              emptyText: 'No clear feature requests detected',
              tone: 'request',
            })}
          </section>
        </div>
      </div>
    </div>
  )
}
