import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

const initialData = {
  isLoggedIn: false,
  handleLogin: () => { }
}

export const AuthContext = createContext(initialData);

export const AuthContextProvider = ({
  children
}) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('handle login clicked')
    setIsUserLoggedIn(true);
  }

  const handleLogout = () => {
    console.log('handle logout clicked')
    setIsUserLoggedIn(false);
    navigate('/')
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