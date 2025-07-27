export const mockFinancialData = {
  profile: {
    netWorth: 6500000, // Includes physical assets
    assets: 8000000,
    liabilities: 1500000,
    creditScore: 780,
  },
  netWorthHistory: [
    { month: 'Jan', netWorth: 5800000 },
    { month: 'Feb', netWorth: 5950000 },
    { month: 'Mar', netWorth: 6050000 },
    { month: 'Apr', netWorth: 6200000 },
    { month: 'May', netWorth: 6350000 },
    { month: 'Jun', netWorth: 6500000 },
  ],
  assetAllocation: [
    { name: 'Stocks', value: 3000000 },
    { name: 'Mutual Funds', value: 1200000 },
    { name: 'Real Estate', value: 1500000 },
    { name: 'Gold', value: 500000 },
    { name: 'EPF', value: 800000 },
    { name: 'FDs', value: 1000000 },
  ],
  stockHoldings: [
    { name: 'Reliance Industries', symbol: 'RELIANCE', value: 500000, totalReturn: 75000 },
    { name: 'Tata Consultancy Services', symbol: 'TCS', value: 400000, totalReturn: 50000 },
    { name: 'HDFC Bank', symbol: 'HDFCBANK', value: 450000, totalReturn: 30000 },
    { name: 'Infosys', symbol: 'INFY', value: 350000, totalReturn: -10000 },
    { name: 'Tata Steel', symbol: 'TATASTEEL', value: 200000, totalReturn: 40000 },
  ],
  recentTransactions: [
    { description: 'Salary', category: 'Income', type: 'Income', amount: 200000 },
    { description: 'Rent', category: 'Housing', type: 'Expense', amount: 45000 },
    { description: 'Netflix Subscription', category: 'Entertainment', type: 'Expense', amount: 649 },
    { description: 'Stock Investment', category: 'Investment', type: 'Expense', amount: 50000 },
    { description: 'Grocery Shopping', category: 'Food', type: 'Expense', amount: 8500 },
  ],
  fullTransactionHistory: JSON.stringify([
    { date: '2024-07-01', description: 'Salary Deposit', amount: 200000, type: 'credit' },
    { date: '2024-07-01', description: 'Rent Payment', amount: -45000, type: 'debit' },
    { date: '2024-07-02', description: 'Grocery Store', amount: -5500, type: 'debit' },
    { date: '2024-07-03', description: 'SIP - Tech Fund', amount: -10000, type: 'debit' },
    { date: '2024-07-05', description: 'Restaurant', amount: -3200, type: 'debit' },
    { date: '2024-07-05', description: 'Netflix', amount: -649, type: 'debit' },
    { date: '2024-07-06', description: 'Fuel', amount: -3000, type: 'debit' },
    { date: '2024-07-07', description: 'Weekend Shopping', amount: -12000, type: 'debit' },
    { date: '2024-07-08', description: 'Utility Bill', amount: -2500, type: 'debit' },
    { date: '2024-07-10', description: 'Zomato Order', amount: -750, type: 'debit' },
    { date: '2024-07-10', description: 'Zomato Order', amount: -750, type: 'debit' }, // Duplicate for anomaly
    { date: '2024-07-12', description: 'Large ATM Withdrawal', amount: -50000, type: 'debit' }, // Large purchase
    { date: '2024-06-01', description: 'Rent Payment', amount: -40000, type: 'debit' }, // Rent spike
  ]),
  userProfile: 'A 30-year-old software engineer with a stable income. Spends moderately on lifestyle and invests regularly in tech stocks and mutual funds. Typical monthly expenses are around 80,000-1,00,000.',
  financialHealthInput: {
    income: 200000,
    expenses: 90000,
    assets: 8000000,
    liabilities: 1500000,
    creditScore: 780,
    financialGoals: 'Save for a house down payment of 20 lakhs in 3 years and build a retirement corpus of 5 crores.',
  },
};
