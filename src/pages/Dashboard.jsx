import { useState, useRef, useEffect } from 'react'
import FeedbackInput from '../components/FeedbackInput'
import ResultsPanel from '../components/ResultsPanel'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import Footer from '../components/Footer'
import { analyzeFeedback } from '../utils/analyseFeedback'
import { sampleFeedback } from '../data/sampleFeedback'

export default function Dashboard() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const [sentimentCounts, setSentimentCounts] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  })

  const resultsRef = useRef(null)

  const handleAnalyze = () => {
    if (text.trim().length < 20) {
      setError('Please paste more feedback (at least a few sentences).')
      setStatus('error')
      return
    }

    setStatus('loading')
    setError('')
    setResult(null)

    setTimeout(() => {
      const data = analyzeFeedback(text)
      setResult(data)
      setSentimentCounts((prev) => ({
        ...prev,
        [data.sentiment]: prev[data.sentiment] + 1,
      }))
      setStatus('success')
    }, 900)
  }

  const handleSample = () => {
    const random =
      sampleFeedback[Math.floor(Math.random() * sampleFeedback.length)]
    setText(random.text)
    setResult(null)
    setError('')
    setStatus('idle')
  }

  /**
   * Scroll to results when analysis completes
   * (mobile + desktop)
   */
  useEffect(() => {
    if (status === 'success' && resultsRef.current) {
      setTimeout(() => {
        const y =
          resultsRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          80 // offset for header

        window.scrollTo({
          top: y,
          behavior: 'smooth',
        })
      }, 150)
    }
  }, [status])

  return (
    <div className='relative min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-950'>
      <div className='pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl' />
      <div className='pointer-events-none absolute -right-40 top-72 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl' />
      <main className='relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-24'>
        {/* Header */}
        <header className='mb-12 sm:mb-16'>
          <div className='flex items-center justify-between gap-6'>
            <p className='text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>
              Feedback intelligence
            </p>

            <p className='hidden sm:block text-xs text-slate-400'>
              Local analysis · No sign-in
            </p>
          </div>

          <div className='mt-6 grid lg:grid-cols-[1.08fr_0.92fr] gap-6 lg:gap-16 items-end'>
            <h1 className='max-w-3xl text-[2.7rem] sm:text-[3.8rem] lg:text-[4.7rem] font-bold tracking-[-0.055em] leading-[0.94] text-slate-950'>
              Find the signal
              <span className='block sm:ml-[10%]'>
                inside the <span className='font-serif italic font-normal tracking-[-0.025em] text-slate-500'>noise.</span>
              </span>
            </h1>

            <p className='max-w-md lg:pb-1 text-[0.95rem] sm:text-base leading-7 text-slate-600'>
              Paste raw customer feedback and surface sentiment, recurring
              complaints, feature requests, and common themes in seconds.
            </p>
          </div>
        </header>

        {/* Input */}
        <section className='relative'>
          <div className='mb-5 flex items-center gap-3'>
            <span className='text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600'>
              01
            </span>
            <span className='h-px w-10 bg-indigo-200' />
            <span className='text-xs text-slate-500'>Bring in the raw feedback</span>
          </div>

          <FeedbackInput
            text={text}
            setText={setText}
            onAnalyze={handleAnalyze}
            onSample={handleSample}
            loading={status === 'loading'}
          />
        </section>

        {/* Results */}
        <section
          ref={resultsRef}
          className='mt-16 sm:mt-20 pt-8 border-t border-slate-200/80 space-y-6 transition-opacity duration-300'
        >
          <div className='mb-7 flex items-center gap-3'>
            <span className='text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600'>
              02
            </span>
            <span className='h-px w-10 bg-indigo-200' />
            <span className='text-xs text-slate-500'>Read the signal</span>
          </div>
          {status === 'idle' && !text && <EmptyState />}
          {status === 'loading' && <LoadingState />}
          {status === 'error' && <ErrorState message={error} />}
          {status === 'success' && result && (
            <ResultsPanel result={result} sentimentCounts={sentimentCounts} />
          )}
        </section>
      </main>

      {/* Footer */}
      <div className='relative mt-8'>
        <Footer />
      </div>
    </div>
  )
}
