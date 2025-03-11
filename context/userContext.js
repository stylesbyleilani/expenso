

import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({
  user: { username: '', email: '' },
  setUser: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    email: ''
  });

  return (
    <UserContext.Provider value={{ user, setUser , username:user.username}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};




// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { auth, db } from '../Lib/firebase';
// import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// // Create the context
// const UserContext = createContext();

// // Create a hook to use the context
// export const useUser = () => useContext(UserContext);

// // Create the provider component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
//       if (authUser) {
//         // User is signed in
//         try {
//           // Get user data from Firestore
//           const userDoc = await getDoc(doc(db, 'users', authUser.uid));
          
//           if (userDoc.exists()) {
//             // User exists in Firestore
//             setUser({
//               uid: authUser.uid,
//               email: authUser.email,
//               ...userDoc.data()
//             });
//           } else {
//             // New user, create document in Firestore
//             const newUser = {
//               uid: authUser.uid,
//               email: authUser.email,
//               username: authUser.email.split('@')[0], // Default username from email
//               createdAt: new Date().toISOString()
//             };
            
//             await setDoc(doc(db, 'users', authUser.uid), newUser);
//             setUser(newUser);
//           }
//         } catch (error) {
//           console.error('Error getting user data:', error);
//           // Fallback to basic auth user info
//           setUser({
//             uid: authUser.uid,
//             email: authUser.email,
//             username: authUser.email.split('@')[0]
//           });
//         }
//       } else {
//         // User is signed out
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     // Cleanup subscription
//     return () => unsubscribe();
//   }, []);

//   // Function to update user data
//   const updateUserData = async (userData) => {
//     if (!user || !user.uid) return false;
    
//     try {
//       // Update in Firestore
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, userData);
      
//       // Update local state
//       setUser({
//         ...user,
//         ...userData
//       });
      
//       return true;
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       return false;
//     }
//   };

//   // Function to manually set user (for non-Firebase auth if needed)
//   const manuallySetUser = (userData) => {
//     setUser(userData);
//   };

//   const value = {
//     user,
//     setUser: manuallySetUser, // Keep for backward compatibility
//     updateUserData, // New method for safer updates
//     loading
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// export default UserContext;