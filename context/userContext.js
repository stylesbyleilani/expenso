// import React, { createContext, useState, useContext } from 'react';

// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState({
//     username: '',
//     email: ''
//   });

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);




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
    <UserContext.Provider value={{ user, setUser }}>
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