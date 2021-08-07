import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert, ImageBackground } from 'react-native';
import { useMutation } from '@apollo/client';
import { withNavigation } from 'react-navigation';

import LOGIN from '../graphql/mutations/LOGIN';
import UserForm from '../components/UserForm';
import LinkButton from '../components/util/LinkButton';
import useAuthContext from '../context/useAuthContext';
import LoginForm from '../components/LoginForm';
import Spacer from '../components/util/Spacer';
import SampleImages from '../util/sampleImages';
import Colors from '../styles/Colors';

const SignInScreen = ({ navigation }) => {
  const { signin } = useAuthContext();
  const [performLogin, { data, loading, error }] = useMutation(LOGIN);

  const onSubmit = ({ email, password }) => {
    performLogin({ variables: { input: { email, password } } });
  };

  useEffect(() => {
    if (data) {
      const { user, message, accessToken, refreshToken } = data.login;
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

  const img = SampleImages[28];

  return (
    <ImageBackground source={img} style={styles.bgImg}>
      <SafeAreaView style={styles.container}>
        <LoginForm onSubmit={onSubmit} />
        <Spacer />
        <LinkButton
          text="Don't have an account? Register"
          onPress={() => navigation.navigate('Register')}
          color={Colors.darkFont}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

SignInScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
  },
});

export default withNavigation(SignInScreen);
