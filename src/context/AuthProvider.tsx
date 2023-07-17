import React, { useEffect, useState } from 'react';
import {  
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, providerGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserCredential } from '../types/UserCredential';
import { AuthContextType } from '../types/AuthContextType';

type AuthProviderType = GoogleAuthProvider;

type Props = {
  children: React.ReactNode;
};

const defaultState = {
  user: null,
  loggingIn: false,
};

export const AuthContext = React.createContext<AuthContextType>(defaultState);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<unknown>(null);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSuccessfulLogin = (credentials: UserCredential) => {
    setUser(credentials.user);
    setLoggingIn(false);
    localStorage.setItem('user', JSON.stringify(credentials.user));
  };

  const handleLogin = (provider: AuthProviderType) => {
    setLoggingIn(true);

    signInWithPopup(auth, provider)
      .then(handleSuccessfulLogin)
      .catch((error) => {
        console.error(error);
        setLoggingIn(false);
      });
  };

  const handleGoogleLogin = () => {
    handleLogin(providerGoogle);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleGoogleLogin,
        handleLogout,
        loggingIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
