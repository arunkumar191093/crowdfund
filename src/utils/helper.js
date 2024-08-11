import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { UserContext } from '../context/user-context';
import { useSnackbar } from 'react-simple-snackbar'

export const useIsLoggedIn = () => {
  const authCtx = useContext(AuthContext);
  return authCtx.isLoggedIn;
}

export const useGetUserData = () => {
  const userCtx = useContext(UserContext);
  return userCtx?.userData;
}

export const useShowSnackbar = (isSuccess) => {
  const options = {
    position: 'top-center',
    style: {
      backgroundColor: 'white',
      border: isSuccess ? '1px solid green' : '1px solid red',
      color: isSuccess ? 'green' : 'red',
      fontSize: '14px',
      textAlign: 'center',
    },
    closeStyle: {
      color: isSuccess ? 'green' : 'red',
      fontSize: '16px',
    },
  }
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  return {
    openSnackbar,
    closeSnackbar
  }
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

export const validateDonation = (amount) => {
  return !isNaN(amount) && amount <= 0
}

export const validateProjectData = (projectData) => {
  const { title, description, goal } = projectData;
  return title && description && goal;
}