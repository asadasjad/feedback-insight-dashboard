import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = {
  positive: '#4ade80',
  neutral: '#cbd5e1',
  negative: '#fb7185',
}

const LABELS = {
  positive: 'Positive',
  neutral: 'Neutral',
  negative: 'Negative',
}

export default function SentimentChart({ sentiment, sentimentCounts }) {
  const data = [
    { key: 'positive', label: 'Positive', value: sentimentCounts.positive },
    { key: 'neutral', label: 'Neutral', value: sentimentCounts.neutral },
    { key: 'negative', label: 'Negative', value: sentimentCounts.negative },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const hasData = total > 0

  if (!hasData) return null

  const dominant = data.reduce((highest, item) =>
    item.value > highest.value ? item : highest
  )

  const dominantPercent = Math.round((dominant.value / total) * 100)
  const overallKey = COLORS[sentiment] ? sentiment : dominant.key

  return (
    <div className='flex h-full flex-col'>
      <div className='relative mx-auto h-52 w-full max-w-[17rem] sm:h-56'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              cx='50%'
              cy='50%'
              innerRadius='72%'
              outerRadius='92%'
              paddingAngle={3}
              cornerRadius={8}
              stroke='none'
              isAnimationActive
              animationDuration={700}
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={COLORS[entry.key]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name, item) => [
                `${value} response${value === 1 ? '' : 's'}`,
                item.payload.label,
              ]}
              contentStyle={{
                background: '#0f172a',
                border: 'none',
                borderRadius: 14,
                color: 'white',
                fontSize: 12,
                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.18)',
              }}
              itemStyle={{ color: 'white' }}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className='pointer-events-none absolute inset-0 grid place-items-center'>
          <div className='text-center'>
            <p className='text-3xl sm:text-4xl font-bold tracking-[-0.055em] text-slate-950'>
              {dominantPercent}%
            </p>
            <p className='mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
              {dominant.label}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-5 space-y-3'>
        {data.map((item) => {
          const percentage = Math.round((item.value / total) * 100)

          return (
            <div key={item.key} className='grid grid-cols-[5.5rem_1fr_auto] items-center gap-3'>
              <div className='flex items-center gap-2'>
                <span
                  className='h-2 w-2 rounded-full'
                  style={{ backgroundColor: COLORS[item.key] }}
                />
                <span className='text-xs text-slate-500'>{item.label}</span>
              </div>

              <div className='h-1.5 overflow-hidden rounded-full bg-slate-100'>
                <div
                  className='h-full rounded-full transition-[width] duration-700 ease-out'
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: COLORS[item.key],
                  }}
                />
              </div>

              <span className='w-9 text-right text-xs tabular-nums text-slate-400'>
                {percentage}%
              </span>
            </div>
          )
        })}
      </div>

      <div className='mt-auto pt-7'>
        <div className='flex items-center justify-between gap-4 border-t border-slate-100 pt-5'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>
              Overall signal
            </p>
            <p className='mt-1 text-sm font-semibold capitalize text-slate-800'>
              {LABELS[overallKey]}
            </p>
          </div>

          <span
            className='h-3 w-3 rounded-full ring-4 ring-slate-100'
            style={{ backgroundColor: COLORS[overallKey] }}
          />
        </div>
      </div>
    </div>
  )
}
