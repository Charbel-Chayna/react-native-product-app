import React, { createContext, useState, useContext, ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  isVerified: boolean;
  login: () => void;
  verify: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const login = () => setIsLoggedIn(true);
  const verify = () => setIsVerified(true);
  const logout = () => {
    setIsLoggedIn(false);
    setIsVerified(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isVerified, login, verify, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
