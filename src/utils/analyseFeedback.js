/**
 * Feedback analysis utility
 * -------------------------
 * Performs:
 * - Sentiment analysis using keyword matching
 * - Keyword frequency extraction
 * - Top recurring complaints detection
 * - Top feature request detection
 */

const SENTIMENT_KEYWORDS = {
  positive: [
    'good',
    'great',
    'love',
    'fast',
    'excellent',
    'smooth',
    'helpful',
    'easy',
    'intuitive',
    'clean',
    'reliable',
    'well designed',
    'useful',
    'responsive',
    'stable',
    'efficient',
  ],

  negative: [
    'bad',
    'slow',
    'bug',
    'issue',
    'expensive',
    'crash',
    'problem',
    'lag',
    'confusing',
    'difficult',
    'frustrating',
    'broken',
    'unreliable',
    'poor',
    'missing',
    'disappointing',
  ],

  neutral: [
    'okay',
    'average',
    'fine',
    'decent',
    'works',
    'acceptable',
    'standard',
    'nothing special',
    'as expected',
  ],
}

const COMPLAINT_KEYWORDS = [
  "slow",
  "lag",
  "bug",
  "issue",
  "problem",
  "crash",
  "expensive",
  "confusing",
  "missing",
  "unreliable",
  "poor performance",
  "hard to use",
  "not working",
  "takes too long"
];


const FEATURE_REQUEST_KEYWORDS = [
  "add",
  "feature",
  "support",
  "integration",
  "dark mode",
  "export",
  "analytics",
  "customization",
  "settings",
  "mobile app",
  "api",
  "dashboard",
  "filter",
  "search",
  "notifications"
];


/**
 * Normalize text for analysis
 */
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
}

/**
 * Count keyword frequency in text
 */
function countKeywords(text, keywords) {
  const counts = {}

  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    const matches = text.match(regex)
    if (matches) {
      counts[keyword] = matches.length
    }
  })

  return counts
}

/**
 * Determine overall sentiment
 */
function detectSentiment(text) {
  const scores = { positive: 0, neutral: 0, negative: 0 }

  Object.entries(SENTIMENT_KEYWORDS).forEach(([sentiment, keywords]) => {
    keywords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'g')
      const matches = text.match(regex)
      if (matches) {
        scores[sentiment] += matches.length
      }
    })
  })

  // Find sentiment with highest score
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
}

/**
 * Extract top N items from frequency object
 */
function topN(freqObject, n = 3) {
  return Object.entries(freqObject)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key]) => key)
}

/**
 * Main analysis function
 */
export function analyzeFeedback(text) {
  const normalizedText = normalize(text)
  const lines = text.split('\n').filter(Boolean)

  const sentiment = detectSentiment(normalizedText)

  const complaintCounts = countKeywords(normalizedText, COMPLAINT_KEYWORDS)

  const featureCounts = countKeywords(normalizedText, FEATURE_REQUEST_KEYWORDS)

  return {
    entries: lines.length,
    sentiment,
    topComplaints: topN(complaintCounts),
    topFeatureRequests: topN(featureCounts),
  }
}
