import { sampleFeedback } from '../data/sampleFeedback'

export default function FeedbackInput({
  text,
  setText,
  onAnalyze,
  onSample,
  loading,
}) {
  const isInputEmpty = text.trim().length === 0

  const loadSample = () => {
    const random =
      sampleFeedback[Math.floor(Math.random() * sampleFeedback.length)]
    setText(random.text)
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-7'>
      <div className=' lg:col-span-2  bg-gray-200  rounded-3xl p-6 shadow-2sm  transition-all'>
        <label className='text-sm  text-gray-600  font-medium'>
          Customer Feedback
        </label>

        <div>
          <textarea
            className='w-full custom-scroll resize-none overflow-y-auto h-48 resize-none shadow-sm rounded-3xl p-5 mb-3 text-sm bg-gray-50  focus:outline-0 transition'
            placeholder='Paste customer feedback here (one entry per line)…'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className='flex items-center justify-between text-xs text-slate-500'>
          <span>{text.length} characters</span>

          <div className='flex gap-2'>
            <button
              onClick={loadSample}
              className='px-3 py-1 border-indigo-600 border-1 text-indigo-600 rounded-xl hover:scale-105 hover:px-4 hover:bg-indigo-600 hover:text-white transition-all duration-300'
              disabled={loading}
            >
              Load sample feedback
            </button>

            <button
              onClick={onAnalyze}
              disabled={loading || isInputEmpty}
              className='px-4 py-1 bg-indigo-600 text-white rounded-xl  disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:px-5 transition-all duration-300'
            >
              Analyze feedback
            </button>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 rounded-3xl shadow-sm p-7 space-y-4'>
        <h3 className='text-sm font-medium text-gray-500 uppercase tracking-wide'>
          What we analyze
        </h3>

        <ul className='space-y-2 text-sm text-gray-700'>
          <li>• Overall sentiment</li>
          <li>• Recurring complaints</li>
          <li>• Feature requests</li>
          <li>• Common keywords</li>
        </ul>

        <p className='text-xs text-gray-500'>
          Analysis is based on keyword patterns in the pasted feedback.
        </p>
      </div>
    </div>
  )
}
