import { createContext, useEffect, useState } from "react";
import { setStorage, getStorage } from '../utils/helper';

const initialData = {
  userData: null,
  updateUserCtx: () => { }
}

export const UserContext = createContext(initialData);

export const UserContextProvider = ({
  children
}) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    let userInfo = getStorage('user-data')
    if (userInfo) {
      setUserInfo({ ...userInfo });
    }
  }, []);

  const updateUserInfo = (data) => {
    let userData = { ...data };
    setUserInfo(userData);
    setStorage('user-data', userData)
  }

  return (
    <UserContext.Provider
      value={{
        userData: userInfo,
        updateUserCtx: updateUserInfo
      }}
    >
      {children}
    </UserContext.Provider>
  );
};