import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { withNavigation } from 'react-navigation';

import RegisterForm from '../components/RegisterForm';
import register from '../graphql/mutations/register';
import LinkButton from '../components/util/LinkButton';
import useAuthContext from '../context/useAuthContext';

const RegisterScreen = ({ navigation }) => {
  const { signin } = useAuthContext();
  const [performRegistration, { data, loading, error }] = useMutation(register);

  const onSubmit = ({ email, password, role }) => {
    performRegistration({ variables: { input: { email, password, role } } });
  };

  useEffect(() => {
    if (data) {
      const { user, message, accessToken, refreshToken } = data.register;
      if (message) {
        Alert.alert('Ooops!', message);
      }
      if (user && accessToken && refreshToken) {
        signin({ user, accessToken, refreshToken });
      }
    }
    if (error) {
      let message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
    }
  }, [data, error]);

  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm
        headerText="Register"
        errorMessage={'state.errorMessage'}
        onSubmit={onSubmit}
        submitButtonText="Sign In"
      />
      <LinkButton
        text="Already have an account? Log in"
        onPress={() => navigation.navigate('Signin')}
      />
    </SafeAreaView>
  );
};

RegisterScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withNavigation(RegisterScreen);
