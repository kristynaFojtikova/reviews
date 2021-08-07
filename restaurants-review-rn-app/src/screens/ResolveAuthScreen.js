import { useQuery } from '@apollo/client';
import React from 'react';
import { withNavigation } from 'react-navigation';
import useAuthContext from '../context/useAuthContext';
import USER from '../graphql/queries/USER';

const ResolveAuthScreen = ({ navigation }) => {
  const { updateUser } = useAuthContext();

  useQuery(USER, {
    onCompleted: async (res) => {
      if (res) {
        const { user } = res;
        updateUser(user);
      } else {
        navigation.navigate('authFlow');
      }
    },
    onError: (error) => navigation.navigate('authFlow'),
  });

  return null;
};

export default withNavigation(ResolveAuthScreen);
