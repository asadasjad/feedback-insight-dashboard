/**
 * Feedback analysis utility (enhanced)
 * -----------------------------------
 * Features:
 * - Weighted sentiment detection
 * - Negation-aware phrase matching
 * - Complaint categorization
 * - Feature request detection
 * - Mixed-sentiment handling
 * - Confidence scoring
 */

/* -------------------- CONFIG -------------------- */

const SENTIMENT_RULES = {
  positive: [
    { term: "excellent", weight: 3 },
    { term: "fantastic", weight: 3 },
    { term: "love", weight: 3 },
    { term: "great", weight: 2 },
    { term: "good", weight: 1 },
    { term: "smooth", weight: 2 },
    { term: "fast", weight: 1 },
    { term: "reliable", weight: 2 },
    { term: "well designed", weight: 3 },
    { term: "easy to use", weight: 2 },
    { term: "intuitive", weight: 2 },
  ],

  negative: [
    { term: "not working", weight: 3 },
    { term: "crash", weight: 3 },
    { term: "crashes frequently", weight: 3 },
    { term: "broken", weight: 3 },
    { term: "poor performance", weight: 3 },
    { term: "frustrating", weight: 2 },
    { term: "slow", weight: 1 },
    { term: "lag", weight: 1 },
    { term: "confusing", weight: 2 },
    { term: "hard to use", weight: 2 },
    { term: "disappointing", weight: 2 },
    { term: "takes too long", weight: 2 },
  ],

  neutral: [
    { term: "okay", weight: 1 },
    { term: "average", weight: 1 },
    { term: "fine", weight: 1 },
    { term: "works as expected", weight: 2 },
    { term: "acceptable", weight: 1 },
  ],
};

const COMPLAINT_CATEGORIES = {
  performance: [
    "slow",
    "lag",
    "poor performance",
    "takes too long",
    "loading forever",
    "unresponsive",
  ],

  stability: [
    "crash",
    "crashes frequently",
    "broken",
    "not working",
    "freezes",
  ],

  usability: [
    "confusing",
    "hard to use",
    "not intuitive",
    "difficult",
  ],

  pricing: [
    "expensive",
    "overpriced",
    "too costly",
  ],
};

const FEATURE_REQUEST_TERMS = [
  "dark mode",
  "export",
  "analytics",
  "mobile app",
  "api",
  "dashboard",
  "search",
  "filter",
  "notifications",
  "integration",
  "customization",
  "settings",
];

/* -------------------- HELPERS -------------------- */

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function hasNegation(text, phrase) {
  const negations = ["no", "not", "never", "without", "nothing"];
  return negations.some((n) => text.includes(`${n} ${phrase}`));
}

function phraseRegex(phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\w*\\b`, "g");
}

/* -------------------- SENTIMENT -------------------- */

function detectSentiment(text) {
  const scores = { positive: 0, neutral: 0, negative: 0 };

  Object.entries(SENTIMENT_RULES).forEach(([sentiment, rules]) => {
    rules.forEach(({ term, weight }) => {
      if (hasNegation(text, term)) return;

      const matches = text.match(phraseRegex(term));
      if (matches) {
        scores[sentiment] += matches.length * weight;
      }
    });
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topSentiment, topScore] = sorted[0];
  const secondScore = sorted[1][1];

  if (topScore === 0) {
    return { sentiment: "neutral", confidence: "low" };
  }

  if (topScore - secondScore <= 1) {
    return { sentiment: "neutral", confidence: "medium" };
  }

  return {
    sentiment: topSentiment,
    confidence: topScore >= 4 ? "high" : "medium",
  };
}

/* -------------------- COMPLAINTS -------------------- */

function detectComplaints(text) {
  const categoryCounts = {};

  Object.entries(COMPLAINT_CATEGORIES).forEach(([category, terms]) => {
    let count = 0;

    terms.forEach((term) => {
      if (hasNegation(text, term)) return;
      const matches = text.match(phraseRegex(term));
      if (matches) count += matches.length;
    });

    if (count > 0) {
      categoryCounts[category] = count;
    }
  });

  return categoryCounts;
}

/* -------------------- FEATURES -------------------- */

function detectFeatures(text) {
  const counts = {};

  FEATURE_REQUEST_TERMS.forEach((term) => {
    if (hasNegation(text, term)) return;
    const matches = text.match(phraseRegex(term));
    if (matches) {
      counts[term] = matches.length;
    }
  });

  return counts;
}

/* -------------------- MAIN -------------------- */

export function analyzeFeedback(text) {
  const normalized = normalize(text);
  const entries = text.split("\n").filter(Boolean).length;

  const { sentiment, confidence } = detectSentiment(normalized);
  const complaintCategories = detectComplaints(normalized);
  const featureCounts = detectFeatures(normalized);

  const topComplaints = Object.entries(complaintCategories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);

  const topFeatureRequests = Object.entries(featureCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);

  return {
    entries,
    sentiment,
    sentimentConfidence: confidence,
    topComplaints,
    complaintCategories,
    topFeatureRequests,
  };
}
