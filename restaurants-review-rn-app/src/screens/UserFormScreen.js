import React, { useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

import UserForm from '../components/form/UserForm';
import Spacer from '../components/util/Spacer';
import { useUsersContext } from '../context/UsersContext';
import CommonStyles from '../styles/CommonStyles';

const UserFormScreen = ({ navigation }) => {
  const {
    createUser,
    createUserLoading,
    setCreateUserData,
    createUserData,
    error,
    setError,
    usersFetch,
  } = useUsersContext();

  useEffect(() => {
    if (createUserData) {
      const { user, message } = createUserData.register;
      if (message) {
        Alert.alert('Ooops!', message);
      }
      if (user) {
        usersFetch();
        navigation.pop();
      }
      setCreateUserData();
    }
  }, [createUserData]);

  useEffect(() => {
    if (error) {
      const message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
      setError();
    }
  }, [error]);

  return (
    <SafeAreaView style={CommonStyles.container}>
      <UserForm onSubmit={createUser} loading={createUserLoading} admin />
      <Spacer />
    </SafeAreaView>
  );
};

UserFormScreen.navigationOptions = {
  header: () => false,
};

export default withNavigation(UserFormScreen);
