import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { withNavigation } from 'react-navigation';
import * as R from 'ramda';

import REGISTER from '../graphql/mutations/REGISTER';
import UserForm from '../components/UserForm';
import LinkButton from '../components/util/LinkButton';
import useAuthContext from '../context/useAuthContext';
import Spacer from '../components/util/Spacer';

const UserFormScreen = ({ navigation }) => {
  const { signin } = useAuthContext();

  const [action, { data, loading, error }] = useMutation(REGISTER);

  const onSubmit = ({ email, password, role }) => {
    action({ variables: { input: { email, password, role } } });
  };

  useEffect(() => {
    if (data) {
      const { user, message } = data.register;
      if (message) {
        Alert.alert('Ooops!', message);
      }
      if (user) {
        const callback = R.path(['state', 'params', 'callback'], navigation);
        if (callback) {
          callback();
        }
        navigation.pop();
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      let message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <UserForm onSubmit={onSubmit} loading={loading} admin />
      <Spacer />
    </SafeAreaView>
  );
};

UserFormScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withNavigation(UserFormScreen);
