import { createContext, useState } from "react";

const initialData = {
  userData: null,
  updateUserCtx: () => { }
}

export const UserContext = createContext(initialData);

export const UserContextProvider = ({
  children
}) => {
  const [userInfo, setUserInfo] = useState(null);

  const updateUserInfo = (data) => {
    setUserInfo({ ...data });
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