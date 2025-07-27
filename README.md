#  FIN PILOT – Your Personal Assistive AI agent for finance management   
**FIN PILOT is an AI-powered personal financial assistant designed to revolutionize the way individuals manage money. Unlike traditional finance trackers that rely on manual entry and static dashboards, FIN PILOT offers an intelligent, conversational, and simulation-based experience — making personal finance interactive, predictive, and privacy-first.**

---

##  Problem Statement

Managing personal finances today is fragmented, reactive, and unintelligent.

People juggle between banks, wallets, SIPs, loans, and credit cards — yet most tools offer only static dashboards, not decisions. Existing AI chatbots lack access to structured, real-time financial data, making them incapable of answering deeply personal questions like:  
> “Can I retire at 45?”  
> “Should I invest more or prepay my loan?”  
> “Why did my net worth drop this month?”

As a result, users face decision fatigue, switching between apps to manually interpret charts. Security is also a concern: password-based systems and vague data sharing compromise privacy and control.

FIN PILOT solves this by combining Gemini-powered financial reasoning, FI Money’s real-time data APIs, and OTH (One-Time Handshake) authentication for secure, actionable, and private financial intelligence.

---

## Solution: FIN PILOT

FIN PILOT is an intelligent, AI-native personal finance assistant that delivers real-time, personalized financial guidance through voice and text. It securely connects with your financial sources and answers smart questions, detects risks, simulates future outcomes, and adapts to your goals — all while preserving your privacy.

### Highlights:
-  Connected to 18+ financial sources via FI Money’s MCP protocol
-  Gemini-powered reasoning: “What happens if I increase my SIP by ₹5K?”
-  OTH (One-Time Handshake) Authentication for seamless, passwordless access
- Real-time dashboards: FIRE timeline, savings %, net worth trend
-  Anomaly alerts for missed SIPs, debt spikes, and spending deviations
- Zero manual input with automatic bank/SMS/UPI data sync

---

## Architecture & Hosting

| Layer             | Technology Stack                          |
|------------------|--------------------------------------------|
| Frontend          | Dialogflow Messenger / React.js (optional)|
| AI Engine         | Google Dialogflow + Gemini (via Vertex AI)|
| Backend           | Google Cloud Functions, Firebase Hosting  |
| Authentication    | OTH (One-Time Handshake), Firebase Auth   |
| Data Layer        | Google Sheets, FI Money API, Firestore    |
| Dashboards        | Google Looker Studio                      |
| Monitoring        | GCP Logs Explorer + Firebase Monitoring   |

> Hosted via Firebase + Google Cloud with CI/CD pipelines.

---

## OTH Authentication

FIN PILOT uses a passwordless login system called **One-Time Handshake (OTH)**:

- No passwords, only secure device-tied tokens
- Cryptographic key handshake validates access
- Tokens expire automatically (ephemeral)
- Zero PII stored on servers
- Re-authentication is frictionless and secure

This ensures privacy, speed, and control — making authentication invisible but airtight.

---

##  Folder Structure

/docs → Architecture, flows, research
/dialogflow-agent → Intents and entities (JSON export)
/firebase-config → Firebase auth, Firestore rules
/scripts → Google Apps Script & Cloud Functions
/sheets-template → Templates for FIRE, Expenses, Income
/dashboard → Looker Studio config / React dashboard
/assets → UI Screenshots and diagrams


---

## Steps to Launch FIN PILOT

###  Backend & Data
1. Clone this repository.
2. Set up Google Sheets with structured headers from `/sheets-template/`.
3. Deploy Cloud Functions in `/scripts/` to handle Dialogflow webhook logic.
4. Set up Firebase project → Enable Hosting, Auth, and Firestore.

### Chatbot Setup
1. Import `dialogflow-agent/` into Dialogflow Console.
2. Add webhook URL (Cloud Function endpoint) under Fulfillment.
3. Train and test key intents: Log Expense, FIRE Goal, Net Worth, etc.

### OTH Setup
1. Configure Firebase Authentication (email/device-based login).
2. Deploy OTH logic (token verification, expiry, and reauth).
3. Use Firestore to store device token metadata securely.

###  Dashboard (Optional)
1. Open `Looker Studio` and connect it to your Sheet/Firestore data.
2. Customize views: Net Worth Timeline, FIRE Readiness, Risk Alerts.
3. Publish and share access-restricted dashboards.



