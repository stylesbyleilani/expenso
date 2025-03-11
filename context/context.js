


// import React, { useState, createContext } from "react";

// const ExpenseContext = createContext();

// export const ExpenseProvider = ({ children }) => {
//   const [balance, setBalance] = useState(0);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);
//   const [transactions, setTransactions] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleAddTransaction = (transactionData, type = 'income') => {
//   const amount = parseFloat(transactionData.amount);
//   if (!isNaN(amount) && amount > 0) {
//     const newTransaction = {
//       id: Date.now(),
//       amount: amount,
//       date: transactionData.date || new Date().toISOString(),
//       category: {
//       name: transactionData.category,
//       icon: transactionData.categoryIcon
//     },
//       type
//     };

//     setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);

//     if (type === 'expense') {
//       setBalance(prevBalance => prevBalance - amount);
//       setExpense(prevExpense => prevExpense + amount);
//     } else {
//       setBalance(prevBalance => prevBalance + amount);
//       setIncome(prevIncome => prevIncome + amount);
//     }

//     setSelectedCategory(null);
//   }
// };

//   return (
//     <ExpenseContext.Provider
//       value={{
//         balance,
//         income,
//         expense,
//         transactions,
//         selectedCategory,
//         setSelectedCategory,
//         handleAddTransaction
//       }}
//     >
//       {children}
//     </ExpenseContext.Provider>
//   );
// };

// export { ExpenseContext };



import React, { useState, createContext, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Lib/firebase"; // Make sure this import path matches your project structure

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data when auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await loadUserData(user.uid);
      } else {
        // Reset state when user logs out
        resetState();
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const resetState = () => {
    setBalance(0);
    setIncome(0);
    setExpense(0);
    setTransactions([]);
    setSelectedCategory(null);
  };

  const loadUserData = async (userId) => {
    try {
      setIsLoading(true);

      // Get user document reference
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Create transactions collection if not exists
        if (!userDoc.data().hasOwnProperty('transactions')) {
          await updateDoc(userDocRef, {
            transactions: [],
            balance: 0,
            income: 0,
            expense: 0,
          });
        }

        // Get transactions collection
        const transactionsCollectionRef = collection(db, "users", userId, "transactions");
        const querySnapshot = await getDocs(transactionsCollectionRef);
        
        const loadedTransactions = [];
        let totalIncome = 0;
        let totalExpense = 0;

        querySnapshot.forEach((doc) => {
          const transaction = { id: doc.id, ...doc.data() };
          loadedTransactions.push(transaction);
          
          if (transaction.type === 'income') {
            totalIncome += parseFloat(transaction.amount);
          } else {
            totalExpense += parseFloat(transaction.amount);
          }
        });

        setTransactions(loadedTransactions);
        setIncome(totalIncome);
        setExpense(totalExpense);
        setBalance(totalIncome - totalExpense);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleAddTransaction = async (transactionData, type = 'income') => {
  //   const amount = parseFloat(transactionData.amount);
    
  //   if (!isNaN(amount) && amount > 0 && auth.currentUser) {
  //     setIsLoading(true);
  //     const userId = auth.currentUser.uid;
      
  //     try {
  //       const newTransaction = {
  //         amount: amount,
  //         date: transactionData.date || new Date().toISOString(),
  //         category: {
  //           name: transactionData.category,
  //           icon: transactionData.categoryIcon
  //         },
  //         type,
  //         createdAt: new Date().toISOString()
  //       };

  //       // Add transaction to Firestore
  //       const transactionsCollectionRef = collection(db, "users", userId, "transactions");
  //       const docRef = await addDoc(transactionsCollectionRef, newTransaction);
        
  //       // Add id to transaction object
  //       newTransaction.id = docRef.id;
        
  //       // Update local state
  //       setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
        
  //       if (type === 'expense') {
  //         setBalance(prevBalance => prevBalance - amount);
  //         setExpense(prevExpense => prevExpense + amount);
  //       } else {
  //         setBalance(prevBalance => prevBalance + amount);
  //         setIncome(prevIncome => prevIncome + amount);
  //       }
        
  //       // Update user document with summary data
  //       const userDocRef = doc(db, "users", userId);
  //       await updateDoc(userDocRef, {
  //         balance: type === 'expense' ? 
  //           (parseFloat(balance) - amount) : 
  //           (parseFloat(balance) + amount),
  //         income: type === 'income' ? 
  //           (parseFloat(income) + amount) : 
  //           parseFloat(income),
  //         expense: type === 'expense' ? 
  //           (parseFloat(expense) + amount) : 
  //           parseFloat(expense)
  //       });
        
  //       setSelectedCategory(null);
  //     } catch (error) {
  //       console.error("Error adding transaction:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };


  const handleAddTransaction = async (transactionData, type = "income") => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }
  
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
  
    if (!userDoc.exists()) {
      console.log("User document does not exist. Creating one...");
      await setDoc(userDocRef, {
        balance: 0,
        income: 0,
        expense: 0,
        transactions: [],
      });
    }
  
    const amount = parseFloat(transactionData.amount);
    if (isNaN(amount) || amount <= 0) {
      console.error("Invalid transaction amount.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const newTransaction = {
        amount,
        date: transactionData.date || new Date().toISOString(),
        category: { name: transactionData.category, icon: transactionData.categoryIcon },
        type,
        createdAt: new Date().toISOString(),
      };
  
      const transactionsCollectionRef = collection(db, "users", userId, "transactions");
      const docRef = await addDoc(transactionsCollectionRef, newTransaction);
      
      newTransaction.id = docRef.id;
      
      setTransactions((prev) => [newTransaction, ...prev]);
  
      await updateDoc(userDocRef, {
        balance: type === "expense" ? balance - amount : balance + amount,
        income: type === "income" ? income + amount : income,
        expense: type === "expense" ? expense + amount : expense,
      });
  
      console.log("Transaction added successfully:", newTransaction);
  
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    } finally {
      setIsLoading(false);
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
        isLoading,
        setSelectedCategory,
        handleAddTransaction,
        loadUserData
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext };