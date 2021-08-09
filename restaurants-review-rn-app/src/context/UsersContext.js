import React, { useState, useMemo } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import USERS from '../graphql/queries/USERS';
import DELETE_USER from '../graphql/mutations/DELETE_USER';
import REGISTER from '../graphql/mutations/REGISTER';

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [error, setError] = useState(null);
  const [deleteUserSuccess, setDeleteUserSuccess] = useState(null);
  const [createUserData, setCreateUserData] = useState(null);

  const [usersFetch, { loading: usersLoading }] = useLazyQuery(USERS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const { users: newValue } = data;
      setUsers(newValue);
    },
    onError: setError,
  });

  const [deleteUserMutation, { loading: deleteUserLoading }] = useMutation(DELETE_USER, {
    onError: setError,
    onCompleted: () => setDeleteUserSuccess(true),
  });

  const [createUserMutation, { loading: createUserLoading }] = useMutation(REGISTER, {
    onError: (e) => {
      console.log('jdkasljdskl');
      setError(e);
    },
    onCompleted: (data) => setCreateUserData(data),
  });

  const deleteUser = ({ id }) => {
    deleteUserMutation({
      variables: { id },
    });
  };

  const createUser = ({ email, password, role }) => {
    console.log('CREATE', email, password, role);
    createUserMutation({
      variables: { input: { email, password, role } },
    });
  };

  const values = useMemo(
    () => ({
      users,
      usersLoading,
      usersFetch,
      deleteUser,
      deleteUserLoading,
      deleteUserSuccess,
      setDeleteUserSuccess,
      createUser,
      createUserLoading,
      createUserData,
      setCreateUserData,
      error,
      setError,
    }),
    [
      users,
      usersLoading,
      usersFetch,
      deleteUser,
      deleteUserLoading,
      deleteUserSuccess,
      setDeleteUserSuccess,
      createUser,
      createUserLoading,
      createUserData,
      setCreateUserData,
      error,
      setError,
    ]
  );

  return <UsersContext.Provider value={values}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => {
  const context = React.useContext(UsersContext);

  if (context === undefined) {
    throw new Error('`DataHook` hook must be used within a `DataProvider` component');
  }
  return context;
};
