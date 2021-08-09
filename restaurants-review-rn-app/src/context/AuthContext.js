import React, { useEffect, useState, useMemo } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import { navigate } from '../util/navigationRef';
import LOGIN from '../graphql/mutations/LOGIN';
import REGISTER from '../graphql/mutations/REGISTER';
import USER from '../graphql/queries/USER';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  const [register, { data: registerData, loading: registerLoading, error: registerError }] =
    useMutation(REGISTER);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN);

  const navigateUserIntoApp = async (user) => {
    const { role } = user;
    switch (role) {
      case 'CUSTOMER':
        navigate('customerFlow');
        break;
      case 'OWNER':
        navigate('ownerFlow');
        break;
      case 'ADMIN':
        navigate('adminFlow');
        break;
      default:
    }
  };

  const persistTokens = async ({ accessToken, refreshToken }) => {
    console.log('SAVE TOKENS');
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  };

  const [userFetch] = useLazyQuery(USER, {
    onCompleted: async (res) => {
      if (res) {
        const { user: newUser } = res;
        setUser(newUser);
        navigateUserIntoApp(newUser);
      } else {
        navigate('authFlow');
      }
    },
    onError: () => navigate('authFlow'),
  });

  useEffect(() => {
    if (registerData) {
      const { user: newUser, message, accessToken, refreshToken } = registerData.register;
      if (message) {
        setError({ message });
      } else if (newUser && accessToken && refreshToken) {
        setUser(newUser);
        setRefreshToken(refreshToken);
        persistTokens({ accessToken, refreshToken });
        navigateUserIntoApp(newUser);
      }
    }
  }, [registerData]);

  useEffect(() => {
    if (loginData) {
      const { user: newUser, message, accessToken, refreshToken } = loginData.login;
      if (message) {
        setError({ message });
      } else if (newUser && accessToken && refreshToken) {
        setUser(newUser);
        setRefreshToken(refreshToken);
        persistTokens({ accessToken, refreshToken });
        navigateUserIntoApp(newUser);
      }
    }
  }, [loginData]);

  useEffect(() => {
    const anyError = loginError || registerError;
    if (anyError) {
      setError(anyError);
    } else if (error) {
      setError(null);
    }
  }, [loginError, registerError]);

  const values = useMemo(
    () => ({
      userFetch,
      login,
      loginLoading,
      register,
      registerLoading,
      user,
      refreshToken,
      error,
      setError,
    }),
    [userFetch, login, loginLoading, register, registerLoading, user, refreshToken, error, setError]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('`DataHook` hook must be used within a `DataProvider` component');
  }
  return context;
};
