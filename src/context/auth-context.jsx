import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setStorage, getStorage } from '../utils/helper';

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

  useEffect(() => {
    let userInfo = getStorage('user-data')
    if (userInfo) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    console.log('handle login clicked')
    setIsUserLoggedIn(true);
    setStorage('user-data', userData);
  }

  const handleLogout = () => {
    console.log('handle logout clicked')
    localStorage.clear();
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