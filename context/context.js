


import React, { useState, createContext } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddTransaction = (transactionData, type = 'income') => {
  const amount = parseFloat(transactionData.amount);
  if (!isNaN(amount) && amount > 0) {
    // Create new transaction object with only the selected category's icon
    const newTransaction = {
      id: Date.now(),
      amount: amount,
      date: transactionData.date || new Date().toISOString(),
      category: {
      name: transactionData.category,
      icon: transactionData.categoryIcon
    },
      type
    };

    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);

    if (type === 'expense') {
      setBalance(prevBalance => prevBalance - amount);
      setExpense(prevExpense => prevExpense + amount);
    } else {
      setBalance(prevBalance => prevBalance + amount);
      setIncome(prevIncome => prevIncome + amount);
    }

    setSelectedCategory(null);
  }
};

  return (
    <ExpenseContext.Provider
      value={{
        balance,
        income,
        expense,
        transactions,
        selectedCategory,
        setSelectedCategory,
        handleAddTransaction
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext };


