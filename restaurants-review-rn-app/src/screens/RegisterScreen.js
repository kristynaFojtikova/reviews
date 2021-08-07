import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert, ImageBackground } from 'react-native';
import { useMutation } from '@apollo/client';
import { withNavigation } from 'react-navigation';

import REGISTER from '../graphql/mutations/REGISTER';
import UserForm from '../components/UserForm';
import LinkButton from '../components/util/LinkButton';
import useAuthContext from '../context/useAuthContext';
import Spacer from '../components/util/Spacer';
import SampleImages from '../util/sampleImages';
import Colors from '../styles/Colors';

const RegisterScreen = ({ navigation }) => {
  const { signin } = useAuthContext();
  const [performRegistration, { data, loading, error }] = useMutation(REGISTER);

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

  const img = SampleImages[16];

  return (
    <ImageBackground source={img} style={styles.bgImg}>
      <SafeAreaView style={styles.container}>
        <UserForm onSubmit={onSubmit} loading={loading} />
        <Spacer />
        <LinkButton
          text="Already have an account? Log in"
          onPress={() => navigation.navigate('Signin')}
          color={Colors.lightFont}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

RegisterScreen.navigationOptions = {
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

export default withNavigation(RegisterScreen);
