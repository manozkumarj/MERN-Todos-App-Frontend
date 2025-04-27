import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const getToken = async () => {
    setIsAuthenticated(false);
  };

  const authenticateUser = (_token) => {
    setIsAuthenticated(true);
    setAccessToken(_token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        accessToken,
        authenticateUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
