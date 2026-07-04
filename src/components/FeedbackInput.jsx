import { sampleFeedback } from '../data/sampleFeedback'

export default function FeedbackInput({
  text,
  setText,
  onAnalyze,
  loading,
}) {
  const isInputEmpty = text.trim().length === 0

  const loadSample = () => {
    const random =
      sampleFeedback[Math.floor(Math.random() * sampleFeedback.length)]
    setText(random.text)
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch'>
      {/* Input workspace */}
      <div className='lg:col-span-8 rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-3 sm:p-4 shadow-xl shadow-slate-950/[0.04] backdrop-blur-sm'>
        <div className='flex items-center justify-between gap-4 px-2 sm:px-3 pt-2 pb-4'>
          <div>
            <p className='text-sm font-semibold tracking-[-0.02em] text-slate-950'>
              Customer feedback
            </p>
            <p className='mt-1 text-xs text-slate-400'>
              One response per line works best
            </p>
          </div>

          <span className='hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>
            <span className='h-1.5 w-1.5 rounded-full bg-indigo-500' />
            Raw input
          </span>
        </div>

        <div className='relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-[#fbfbfd] transition-all duration-300 focus-within:border-indigo-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.08)]'>
          <textarea
            className='w-full h-56 sm:h-64 resize-none bg-transparent px-5 py-5 sm:px-6 sm:py-6 text-[0.95rem] sm:text-base leading-7 text-slate-800 placeholder:text-slate-400 focus:outline-none'
            placeholder='Paste customer feedback here…'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#fbfbfd] to-transparent opacity-60' />
        </div>

        <div className='flex flex-col gap-4 px-2 sm:px-3 pt-4 pb-2 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-3'>
            <span className='text-xs tabular-nums text-slate-400'>
              {text.length.toLocaleString()} characters
            </span>
            {text.length > 0 && (
              <>
                <span className='h-1 w-1 rounded-full bg-slate-300' />
                <button
                  type='button'
                  onClick={() => setText('')}
                  disabled={loading}
                  className='text-xs text-slate-400 transition-colors hover:text-slate-700 disabled:opacity-50'
                >
                  Clear
                </button>
              </>
            )}
          </div>

          <div className='flex flex-col sm:flex-row gap-2'>
            <button
              type='button'
              onClick={loadSample}
              disabled={loading}
              className='group inline-flex min-h-11 items-center justify-between gap-5 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 hover:px-5 disabled:opacity-50'
            >
              Load sample
              <span className='text-slate-400 transition-transform duration-300 group-hover:rotate-12'>↻</span>
            </button>

            <button
              type='button'
              onClick={onAnalyze}
              disabled={loading || isInputEmpty}
              className='group inline-flex min-h-11 items-center justify-between gap-6 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:bg-indigo-500 hover:px-6 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none'
            >
              <span>{loading ? 'Analyzing…' : 'Analyze feedback'}</span>
              <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis preview */}
      <aside className='relative lg:col-span-4 overflow-hidden rounded-[1.75rem] bg-slate-950 p-6 sm:p-7 text-white shadow-xl shadow-slate-950/10'>
        <div className='pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-500/25 blur-3xl' />

        <div className='relative flex h-full min-h-[22rem] flex-col'>
          <div className='flex items-center justify-between gap-4'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-300'>
              What surfaces
            </p>
            <span className='text-xs text-slate-600'>↗</span>
          </div>

          <div className='mt-10 space-y-1'>
            {[
              ['01', 'Overall sentiment'],
              ['02', 'Recurring complaints'],
              ['03', 'Feature requests'],
              ['04', 'Common themes'],
            ].map(([number, label]) => (
              <div
                key={label}
                className='group flex items-center gap-4 border-b border-white/10 py-4'
              >
                <span className='text-[10px] tabular-nums text-slate-600 transition-colors group-hover:text-indigo-300'>
                  {number}
                </span>
                <span className='text-sm text-slate-300 transition-colors group-hover:text-white'>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p className='mt-auto pt-10 text-xs leading-5 text-slate-500'>
            Transparent pattern-based analysis. Useful for surfacing signals,
            without pretending simple rules understand every nuance.
          </p>
        </div>
      </aside>
    </div>
  )
}
