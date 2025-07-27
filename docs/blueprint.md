# **App Name**: FinPilot

## Core Features:

- AI Financial Analyst: Use Gemini Pro to analyze financial data fetched from Fi Money's MCP API, providing personalized insights and answering user questions about their finances. It uses prompt engineering and acts as a reasoning tool on the given data to offer actionable responses.
- MCP Data Integration: Fetch user's financial data (assets, liabilities, transactions, etc.) from Fi Money’s MCP API, securely authenticating the user using Firebase Auth and OAuth. Access tokens are securely managed.
- Anomaly Detection: Employ Gemini Pro to identify financial anomalies like unusual spending, duplicate subscriptions, or missed SIPs by acting as a tool that reasons about transaction history. Notify users of these anomalies.
- Financial Dashboard: Present a unified dashboard displaying key financial metrics (net worth, assets, liabilities, credit score), interactive charts (net worth history, asset allocation), and recent transactions.
- Data Export: Allow users to export their financial data and insights to various formats like JSON and CSV.
- Personalization Settings: Provide a settings panel allowing users to control profile information, notification preferences and application appearance (light/dark mode)

## Style Guidelines:

- Primary color: A vibrant blue (#29ABE2) to represent trust, stability, and financial technology.
- Background color: A light gray (#F5F5F5) for a clean, modern, and professional look.
- Accent color: A bright green (#90EE90) for positive indicators and actionable items.
- Body and headline font: 'Inter', sans-serif, for a modern and neutral feel. 
- Use clean, geometric icons to represent financial data and actions.
- A card-based layout for presenting information in a clear and organized manner.
- Subtle animations and transitions to provide a smooth and engaging user experience.
