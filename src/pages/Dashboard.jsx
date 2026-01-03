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
    <div className='min-h-screen bg-indigo-50'>
      <div className='max-w-6xl mx-auto px-6 pt-6 pb-24 space-y-8'>
        {/* Header */}
        <header className='space-y-4 mb-10'>
          <h1
            className='
    text-2xl sm:text-3xl
    font-semibold
    text-gray-900
    tracking-tight
  '
          >
            Feedback Insight Dashboard
          </h1>

          <p
            className='
    text-sm sm:text-base
    text-gray-500
    max-w-xl
  '
          >
            Turn raw customer feedback into clear, actionable insights.
          </p>
        </header>

        {/* Input */}
        <FeedbackInput
          text={text}
          setText={setText}
          onAnalyze={handleAnalyze}
          onSample={handleSample}
          loading={status === 'loading'}
        />

        {/* Results */}
        <div
          ref={resultsRef}
          className='pt-6 space-y-6 transition-opacity duration-300'
        >
          {status === 'idle' && !text && <EmptyState />}
          {status === 'loading' && <LoadingState />}
          {status === 'error' && <ErrorState message={error} />}
          {status === 'success' && result && (
            <ResultsPanel result={result} sentimentCounts={sentimentCounts} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='mt-20'>
        <Footer />
      </div>
    </div>
  )
}
