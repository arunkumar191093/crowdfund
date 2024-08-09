import { createContext, useState } from "react";

const initialData = {
  isLoggedIn: false,
}

export const AuthContext = createContext(initialData);


export const AuthContextProvider = ({
  children
}) => {
  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsUserLoggedIn(true);
  }

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isUserLoggedIn,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};