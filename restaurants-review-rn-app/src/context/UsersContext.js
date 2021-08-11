import React, { useState, useMemo } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import USERS from '../graphql/queries/USERS';
import DELETE_USER from '../graphql/mutations/DELETE_USER';
import REGISTER from '../graphql/mutations/REGISTER';
import EDIT_USER from '../graphql/mutations/EDIT_USER';

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [error, setError] = useState(null);
  const [deleteUserSuccess, setDeleteUserSuccess] = useState(null);
  const [createUserData, setCreateUserData] = useState(null);
  const [editUserSuccess, setEditUserSuccess] = useState(null);
  const [user, setUser] = useState(null);

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
      setError(e);
    },
    onCompleted: (data) => setCreateUserData(data),
  });

  const [editUserMutation, { loading: editUserLoading }] = useMutation(EDIT_USER, {
    onError: (e) => {
      setError(e);
    },
    onCompleted: () => setEditUserSuccess(true),
  });

  const deleteUser = ({ id }) => {
    deleteUserMutation({
      variables: { id },
    });
  };

  const createUser = ({ email, password, role }) => {
    createUserMutation({
      variables: { input: { email, password, role } },
    });
  };

  const editUser = ({ email, password, role }) => {
    editUserMutation({
      variables: { input: { email, password, role, id: user.id } },
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
      user,
      setUser,
      editUser,
      editUserLoading,
      editUserSuccess,
      setEditUserSuccess,
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
      user,
      setUser,
      editUser,
      editUserLoading,
      editUserSuccess,
      setEditUserSuccess,
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
