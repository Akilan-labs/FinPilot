import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Investments from './components/Investments';
import AgentChat from './components/AgentChat';
import Goals from './components/Goals';
import Settings from './components/Settings';
import TimeMachine from './components/TimeMachine';
import FinancialDNA from './components/FinancialDNA';
import Budgets from './components/Budgets';
import TaxManagement from './components/TaxManagement';
import * as mockData from './services/mockDataService';
import type { Transaction, Stock, MutualFund, ETF, GoldInvestment, RealEstateInvestment, FixedIncomeInvestment, Budget } from './types';


const App: React.FC = () => {
  // Centralized state for all interactive data
  const [transactions, setTransactions] = useState<Transaction[]>(mockData.getTransactions());
  const [stocks, setStocks] = useState<Stock[]>(mockData.getStocks());
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>(mockData.getMutualFunds());
  const [etfs, setEtfs] = useState<ETF[]>(mockData.getETFs());
  const [goldInvestments, setGoldInvestments] = useState<GoldInvestment[]>(mockData.getGoldInvestments());
  const [realEstate, setRealEstate] = useState<RealEstateInvestment[]>(mockData.getRealEstateInvestments());
  const [fixedIncome, setFixedIncome] = useState<FixedIncomeInvestment[]>(mockData.getFixedIncomeInvestments());
  const [budgets, setBudgets] = useState<Budget[]>(mockData.getBudgets());

  // Handler functions to modify state
  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: uuidv4() }]);
  };
  
  const handleAddStock = (stock: Omit<Stock, 'id' | 'value'>) => {
    setStocks(prev => [...prev, { ...stock, id: uuidv4(), value: stock.quantity * stock.currentPrice }]);
  };

  const handleAddMutualFund = (fund: Omit<MutualFund, 'id' | 'value'>) => {
    setMutualFunds(prev => [...prev, { ...fund, id: uuidv4(), value: fund.quantity * fund.currentPrice }]);
  };
  
  const handleAddEtf = (etf: Omit<ETF, 'id' | 'value'>) => {
    setEtfs(prev => [...prev, { ...etf, id: uuidv4(), value: etf.quantity * etf.currentPrice }]);
  };
  
  const handleAddGold = (gold: Omit<GoldInvestment, 'id' | 'value'>) => {
    setGoldInvestments(prev => [...prev, { ...gold, id: uuidv4(), value: gold.quantity * gold.currentPrice }]);
  };
  
  const handleAddRealEstate = (property: Omit<RealEstateInvestment, 'id' | 'value'>) => {
     setRealEstate(prev => [...prev, { ...property, id: uuidv4(), value: property.currentPrice }]);
  };
  
  const handleAddFixedIncome = (fi: Omit<FixedIncomeInvestment, 'id' | 'value'>) => {
     setFixedIncome(prev => [...prev, { ...fi, id: uuidv4(), value: fi.purchasePrice }]);
  };

  const handleAddBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
      setBudgets(prev => [...prev, { ...budget, id: uuidv4(), spent: 0}])
  }

  const allHandlers = {
    onAddTransaction: handleAddTransaction,
    onAddStock: handleAddStock,
    onAddMutualFund: handleAddMutualFund,
    onAddEtf: handleAddEtf,
    onAddGold: handleAddGold,
    onAddRealEstate: handleAddRealEstate,
    onAddFixedIncome: handleAddFixedIncome,
    onAddBudget: handleAddBudget,
  };


  return (
    <HashRouter>
      <div className="flex h-screen bg-background text-text-primary font-sans antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header {...allHandlers} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard transactions={transactions} onAddTransaction={handleAddTransaction} />} />
              <Route path="/investments/*" element={
                <Investments
                  stocks={stocks} onAddStock={handleAddStock}
                  mutualFunds={mutualFunds} onAddMutualFund={handleAddMutualFund}
                  etfs={etfs} onAddEtf={handleAddEtf}
                  gold={goldInvestments} onAddGold={handleAddGold}
                  realEstate={realEstate} onAddRealEstate={handleAddRealEstate}
                  fixedIncome={fixedIncome} onAddFixedIncome={handleAddFixedIncome}
                />} 
              />
              <Route path="/budgets" element={<Budgets budgets={budgets} transactions={transactions} onAddBudget={handleAddBudget} />} />
              <Route path="/tax-management" element={<TaxManagement mutualFunds={mutualFunds} fixedIncome={fixedIncome} />} />
              <Route path="/agent" element={<AgentChat {...allHandlers} />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/time-machine" element={<TimeMachine />} />
              <Route path="/financial-dna" element={<FinancialDNA />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;