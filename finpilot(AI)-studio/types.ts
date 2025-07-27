export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  timeHorizon: number; // in years
}

export interface FinancialSummary {
  netWorth: number;
  assets: number;
  liabilities: number;
  creditScore: number;
}

export interface NetWorthDataPoint {
  month: string;
  value: number;
}

export interface Asset {
  name: string;
  value: number;
  type: 'Stocks' | 'Mutual Funds' | 'Real Estate' | 'Gold' | 'Fixed Income' | 'Cash' | 'ETFs';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
}

export interface Budget {
    id: string;
    category: string;
    limit: number;
    spent: number;
}

export interface Investment {
  id: string;
  name: string;
  type: 'Stock' | 'Mutual Fund' | 'ETF' | 'Gold' | 'Real Estate' | 'Bond' | 'Fixed Income';
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  value: number;
}

export interface Stock extends Investment {
  ticker: string;
  sector: string;
}

export interface MutualFund extends Investment {
  fundHouse: string;
  category: 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'ELSS' | 'Debt';
}

export interface ETF extends Investment {
  issuer: string;
  expenseRatio: number;
  ticker: string;
}

export interface GoldInvestment extends Investment {
    form: 'Digital Gold' | 'Sovereign Gold Bond' | 'Gold ETF';
    weightInGrams: number;
}

export interface RealEstateInvestment extends Investment {
    location: string;
    propertyType: 'Residential' | 'Commercial';
    rentalIncomePerMonth: number;
}

export interface FixedIncomeInvestment extends Investment {
    instrument: 'Fixed Deposit' | 'Bond' | 'PPF';
    interestRate: number;
    maturityDate: string;
}


export interface Anomaly {
  id: string;
  date: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface StockAnalysis {
  summary: string;
  buySellHoldSignal: 'Buy' | 'Sell' | 'Hold';
  justification: string;
  targetPrice: number;
}

export interface RebalancingSuggestion {
    currentAllocation: { name: string; value: number }[];
    suggestedAllocation: { name: string; value: number }[];
    reasoning: string;
}

export interface FinancialGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    status: 'On Track' | 'At Risk' | 'Completed';
    priority: 'High' | 'Medium' | 'Low';
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    actions?: { label: string; query: string }[];
}

export interface UserSettings {
    theme: 'light' | 'dark';
    allowTransactionAnalysis: boolean;
    allowInvestmentAnalysis: boolean;
    enableProactiveAlerts: boolean;
}

export interface FinancialDNAProfile {
    profileType: 'The Strategic Planner' | 'The Cautious Saver' | 'The Ambitious Investor' | 'The Impulse Spender';
    summary: string;
    strengths: string[];
    growthAreas: string[];
    aiRecommendation: string;
}

export interface FinancialMood {
    mood: 'Stable' | 'Optimistic' | 'Cautious' | 'Stressed';
    reason: string;
}

export interface DailyChallenge {
    id: string;
    type: 'Question' | 'Task';
    text: string;
    isCompleted: boolean;
}

export interface TaxSummary {
    estimatedTaxableIncome: number;
    estimatedTaxLiability: number;
    totalTaxSaved: number;
    section80CLimit: number;
    section80CUtilized: number;
}

export interface TaxSavingInvestment {
    id: string;
    name: string;
    type: 'ELSS' | 'PPF' | 'Other';
    investedAmount: number;
}

// Updated types for Conversational Data Management and Multilingual Support
export type AgentAction =
  | { type: 'speak'; payload: { messageKey: string } }
  | { type: 'add_transaction'; payload: Omit<Transaction, 'id'> }
  | { type: 'add_stock'; payload: Omit<Stock, 'id' | 'value'> }
  | { type: 'add_mutual_fund'; payload: Omit<MutualFund, 'id' | 'value'> }
  | { type: 'add_etf'; payload: Omit<ETF, 'id' | 'value'> }
  | { type: 'add_gold'; payload: Omit<GoldInvestment, 'id' | 'value'> }
  | { type: 'add_real_estate'; payload: Omit<RealEstateInvestment, 'id' | 'value'> }
  | { type: 'add_fixed_income'; payload: Omit<FixedIncomeInvestment, 'id' | 'value'> }
  | { type: 'add_budget'; payload: Omit<Budget, 'id' | 'spent'> };


export interface AgentResponse {
  action: AgentAction;
  confirmationKey: string;
  confirmationParams?: Record<string, string | number>;
}