import React, { useEffect } from 'react';
import { SafeAreaView, Alert, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';

import LinkButton from '../components/util/LinkButton';
import LoginForm from '../components/form/LoginForm';
import Spacer from '../components/util/Spacer';
import SampleImages from '../util/sampleImages';
import Colors from '../styles/Colors';
import { useAuthContext } from '../context/AuthContext';
import CommonStyles from '../styles/CommonStyles';

const SignInScreen = ({ navigation }) => {
  const { login, loginLoading: loading, error, setError } = useAuthContext();

  const onSubmit = ({ email, password }) => {
    login({ variables: { input: { email, password } } });
  };

  useEffect(() => {
    if (error) {
      const message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
      setError();
    }
  }, [error]);

  const img = SampleImages[36];

  return (
    <ImageBackground source={img} style={CommonStyles.container}>
      <SafeAreaView style={CommonStyles.container}>
        <LoginForm onSubmit={onSubmit} loading={loading} />
        <Spacer />
      </SafeAreaView>
    </ImageBackground>
  );
};

SignInScreen.navigationOptions = {
  header: () => false,
};

export default withNavigation(SignInScreen);
