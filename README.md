# Feedback Insight Dashboard

An internal-style product analytics tool that transforms raw customer feedback into clear, actionable insights.

## Why this project exists
Product teams often receive large volumes of unstructured feedback. This tool demonstrates how qualitative input can be systematically analyzed and surfaced as meaningful signals for decision-making.

## Key Features
- Keyword-based sentiment analysis (positive / neutral / negative)
- Detection of recurring complaints
- Identification of common feature requests
- Visual sentiment distribution using charts
- Clean, internal SaaS-style UI with low cognitive load

## Tech Stack
- React (Vite)
- Tailwind CSS
- Recharts
- Plain JavaScript analysis logic (no external NLP libraries)

## Design Principles
- Calm, professional internal dashboard UI
- Minimal visual noise
- Charts as supporting evidence, not decoration
- Clear hierarchy and whitespace-driven layout

## How it works
1. User pastes raw customer feedback
2. Feedback is normalized and analyzed via keyword matching
3. Insights are derived and visualized in a dashboard format

## Running locally
```bash
npm install
npm run dev
