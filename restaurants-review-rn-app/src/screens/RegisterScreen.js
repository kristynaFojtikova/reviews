import React, { useEffect } from 'react';
import { SafeAreaView, Alert, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';

import UserForm from '../components/form/UserForm';
import Spacer from '../components/util/Spacer';
import SampleImages from '../util/sampleImages';
import { useAuthContext } from '../context/AuthContext';
import CommonStyles from '../styles/CommonStyles';

const RegisterScreen = () => {
  const { register, registerLoading: loading, error, setError } = useAuthContext();

  const onSubmit = ({ email, password, role }) => {
    register({ variables: { input: { email, password, role } } });
  };

  useEffect(() => {
    if (error) {
      const message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
      setError();
    }
  }, [error]);

  const img = SampleImages[7];

  return (
    <ImageBackground source={img} style={CommonStyles.container}>
      <SafeAreaView style={CommonStyles.container}>
        <UserForm onSubmit={onSubmit} loading={loading} />
        <Spacer />
      </SafeAreaView>
    </ImageBackground>
  );
};

RegisterScreen.navigationOptions = {
  header: () => false,
};

export default withNavigation(RegisterScreen);
