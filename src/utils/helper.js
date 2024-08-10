import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { UserContext } from '../context/user-context';

export const useIsLoggedIn = () => {
  const authCtx = useContext(AuthContext);
  return authCtx.isLoggedIn;
}

export const useGetUserData = () => {
  const userCtx = useContext(UserContext);
  return userCtx?.userData;
}

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
}