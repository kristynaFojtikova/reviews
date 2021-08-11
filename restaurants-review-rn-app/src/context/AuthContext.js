import React, { useEffect, useState, useMemo } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import { navigate } from '../util/navigationRef';
import LOGIN from '../graphql/mutations/LOGIN';
import REGISTER from '../graphql/mutations/REGISTER';
import USER from '../graphql/queries/USER';
import LOGOUT from '../graphql/mutations/LOGOUT';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

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

  const [register, { loading: registerLoading }] = useMutation(REGISTER, {
    onError: setError,
    onCompleted: (data) => {
      const { user: newUser, message, accessToken, refreshToken } = data.register;
      if (message) {
        setError({ message });
      } else if (newUser && accessToken && refreshToken) {
        setUser(newUser);
        setRefreshToken(refreshToken);
        persistTokens({ accessToken, refreshToken });
        navigateUserIntoApp(newUser);
      }
    },
  });
  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onError: setError,
    onCompleted: (data) => {
      const { user: newUser, message, accessToken, refreshToken } = data.login;
      if (message) {
        setError({ message });
      } else if (newUser && accessToken && refreshToken) {
        setUser(newUser);
        setRefreshToken(refreshToken);
        persistTokens({ accessToken, refreshToken });
        navigateUserIntoApp(newUser);
      }
    },
  });
  const [logoutMutation, { loading: logoutLoading }] = useMutation(LOGOUT, {
    onError: setError,
    onCompleted: async () => {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      navigate('authFlow');
    },
  });

  const logout = async () => {
    console.log('LOUGOUT');
    const refresh = await AsyncStorage.getItem('refreshToken');

    console.log('refresh', refresh);
    logoutMutation({
      variables: {
        refreshToken: refresh,
      },
    });
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

  const values = useMemo(
    () => ({
      userFetch,
      login,
      loginLoading,
      register,
      registerLoading,
      logout,
      logoutLoading,
      user,
      refreshToken,
      error,
      setError,
    }),
    [
      userFetch,
      login,
      loginLoading,
      register,
      registerLoading,
      logout,
      logoutLoading,
      user,
      refreshToken,
      error,
      setError,
    ]
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
