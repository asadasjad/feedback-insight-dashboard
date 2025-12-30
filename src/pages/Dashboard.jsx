import { useState } from 'react'
import FeedbackInput from '../components/FeedbackInput'
import ResultsPanel from '../components/ResultsPanel'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import { analyzeFeedback } from '../utils/analyseFeedback'
import { sampleFeedback } from '../data/sampleFeedback'

export default function Dashboard() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    if (text.trim().length < 20) {
      setError('Please paste more feedback (at least a few sentences).')
      setStatus('error')
      return
    }

    setStatus('loading')
    setError('')
    setResult(null)

    try {
      setTimeout(() => {
        const data = analyzeFeedback(text)
        setResult(data)
        setSentimentCounts((prev) => ({
          ...prev,
          [data.sentiment]: prev[data.sentiment] + 1,
        }))
        setStatus('success')
      }, 1000)
    } catch {
      setError('Something went wrong while analyzing feedback.')
      setStatus('error')
    }
  }

  const handleSample = () => {
    const random =
      sampleFeedback[Math.floor(Math.random() * sampleFeedback.length)]
    setText(random.text)
    setResult(null)
    setError('')
    setStatus('idle')
  }
  const [sentimentCounts, setSentimentCounts] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  })

  return (
    <div className='min-h-screen  p-6 bg-indigo-50 transition-colors'>
      <div className='max-w-6xl mx-auto space-y-6'>
        <header className='space-y-1'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Feedback Insight Dashboard
          </h1>
          <p className='text-sm text-gray-500'>
            Analyze customer feedback to uncover issues, requests, and
            priorities.
          </p>
        </header>

        <FeedbackInput
          text={text}
          setText={setText}
          onAnalyze={handleAnalyze}
          onSample={handleSample}
          loading={status === 'loading'}
        />

        <div className='transition-all duration-300'>
          {status === 'idle' && !text && <EmptyState />}
          {status === 'loading' && <LoadingState />}
          {status === 'error' && <ErrorState message={error} />}
          {status === 'success' && result && (
            <ResultsPanel result={result} sentimentCounts={sentimentCounts} />
          )}
        </div>
      </div>
    </div>
  )
}
