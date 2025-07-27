# FinPilot – AI-Powered Financial Strategist

FinPilot is an AI-native personal finance assistant built using Google Vertex AI (Gemini), Firebase, and Fi Money’s MCP (Model Context Protocol). It goes far beyond standard budgeting tools by offering dynamic financial simulations, investment suggestions, real-time anomaly detection, and goal-driven projections — all powered by structured financial data and conversational AI.

---

## Project Overview

FinPilot delivers:

- Real-time integration with Fi MCP to access structured financial data.
- Personalized financial insights via natural language using Gemini (Vertex AI).
- A unified financial dashboard with visualizations, transaction tracking, and AI-driven recommendations.
- Deep support for SIPs, stock investments, real estate assets, and long-term financial goal tracking.
- Full control, data privacy, and the ability to export insights and data.

---

## Tech Stack

| Layer            | Technology                           |
|------------------|---------------------------------------|
| Frontend         | React.js or Flutter                   |
| Backend          | Firebase Cloud Functions              |
| Hosting          | Firebase Hosting                      |
| Authentication   | Firebase Auth                         |
| AI/LLM Layer     | Gemini via Vertex AI                  |
| Financial Data   | Fi MCP API                            |
| Visualization    | Google Charts / Chart.js              |
| Data Storage     | Firestore                             |
| Optional APIs    | Alpha Vantage / NSE / CoinGecko (for mock stock data) |

---

## Key Features

### Unified Financial Dashboard

- Displays key metrics: Net Worth, Total Assets, Liabilities, Credit Score
- Net Worth over time: Line graph
- Asset Allocation: Pie chart
- Recent Transactions: Timeline view
- Goal Tracker: Progress bars toward major financial targets

### AI-Powered Financial Intelligence

- AI-generated financial summaries with improvement suggestions
- Anomaly detection engine: Flags spending spikes, duplicate charges, unusual deposits
- Investment simulator: Suggests optimized portfolios, asset rebalancing
- Retirement and goal planning projections: “Will I have ₹1 Cr by age 55?”
- Tax optimization and ELSS recommendations
- SIP performance analysis and switching recommendations

### Advanced Investment Module

- Tracks and evaluates:
  - Stocks (buy/sell guidance based on trends and personal goals)
  - Mutual Funds and SIPs (IRR vs benchmark)
  - Real Estate ROI (rental income vs capital appreciation)
  - FDs and Bonds (maturity schedule, post-tax yield)
  - Gold and ETFs (inflation hedge scenarios)
- Supports simulation of:
  - “What if” scenarios
  - Market changes
  - Asset switching
- Uses Gemini prompts for natural language investment guidance

### Data Privacy and Export

- All data stays under the user’s control
- Token-based session access to Fi MCP
- Export to CSV, JSON, Google Sheets, or Notion
- Option to review AI recommendations and audit their reasoning

---

## AI Prompts – Sample Interactions

```plaintext
Prompt: “Analyze user’s SIPs. Risk profile: Moderate. Suggest better alternatives with higher returns or lower expense ratios.”

Prompt: “User wants to retire at 55 with ₹1 Cr. Show a monthly SIP plan based on current assets and income.”

Prompt: “User owns a house worth ₹60L, earning ₹20k/month rent. Should they sell it and invest in index funds? Model returns.”

Prompt: “Flag anomalies in the last 3 months of transactions: [MCP JSON].”

## Data flow
User Input (Voice or Text)
        ↓
Firebase Auth – Validates session
        ↓
Firebase Cloud Functions – Handles requests
        └─ Calls Fi MCP API
        └─ Calls external stock APIs (if applicable)
        └─ Prepares prompt for Gemini
        ↓
Vertex AI – Gemini handles NLP, reasoning, and recommendations
        ↓
Firebase Firestore – Updates stored state/data if needed
        ↓
React/Flutter Frontend – Renders response, charts, insights

