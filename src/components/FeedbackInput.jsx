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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Input Card */}
      <div className="lg:col-span-2 border-indigo-100 bg-gray-100 rounded-3xl p-5 sm:p-6">
        <label className="text-sm text-gray-600 font-medium block mb-2">
          Customer Feedback
        </label>

        <textarea
          className="
            w-full h-44 sm:h-48
            resize-none
            rounded-2xl
            bg-white
            p-4
            text-sm
            shadow-sm
            focus:outline-none
            transition
          "
          placeholder="Paste customer feedback here (one entry per line)…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xs text-slate-500">
            {text.length} characters
          </span>

          <div className="flex flex-col sm:flex-row gap-2">
            {/* Load Sample */}
            <button
              onClick={loadSample}
              disabled={loading}
              className="
                py-2 sm:py-1
                px-4
                rounded-xl sm:rounded-3xl
                border border-indigo-600
                text-indigo-600
                text-sm font-medium
                transition-all 
                sm:hover:bg-indigo-600 sm:hover:text-white sm:hover:scale-105 sm:hover:px-5
                disabled:opacity-50
              "
            >
              <span className="sm:hidden">Load sample</span>
              <span className="hidden sm:inline">Load sample feedback</span>
            </button>

            {/* Analyze */}
            <button
              onClick={onAnalyze}
              disabled={loading || isInputEmpty}
              className="
                py-2 sm:py-1 
                px-4 
                rounded-xl sm:rounded-3xl
                bg-indigo-600
                text-white
                text-sm font-medium
                transition-all   
                sm:hover:bg-indigo-700 sm:hover:scale-105 sm:hover:px-5
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Analyze feedback
            </button>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          What we analyze
        </h3>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Overall sentiment</li>
          <li>• Recurring complaints</li>
          <li>• Feature requests</li>
          <li>• Common keywords</li>
        </ul>

        <p className="text-xs text-gray-500">
          Analysis is based on keyword patterns in the pasted feedback.
        </p>
      </div>
    </div>
  )
}
