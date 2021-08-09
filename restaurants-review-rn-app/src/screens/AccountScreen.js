import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import { withNavigation } from 'react-navigation';
import * as R from 'ramda';

import Spacer from '../components/util/Spacer';
import Button from '../components/util/Button';
import LOGOUT from '../graphql/mutations/LOGOUT';
import Colors from '../styles/Colors';
import { useAuthContext } from '../context/AuthContext';

import { clearApolloStore } from '../graphql/client';

const AccountScreen = ({ navigation }) => {
  const { user, refreshToken } = useAuthContext();

  // const [performLogout, { data, loading, error }] = useMutation(LOGOUT);

  const onLogout = () => {
    clearApolloStore();
    navigation.navigate('authFlow');
    // signout();
    // performLogout({ variables: { refreshToken } });
  };

  const loading = false;

  // useEffect(() => {
  //   if (data) {
  //     const { logout: success } = data;
  //     if (success) {
  //       // clearApolloStore();
  //       // signout();
  //     }
  //   }
  // }, [data, error]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.description}>{` ${R.prop('email', user)}`}</Text>
      <Text style={styles.description}>{`Your current role: ${R.prop('role', user)}`}</Text>
      <Spacer height={30} />
      <Button
        text="Logout"
        iconName="logout"
        onPress={onLogout}
        loading={loading}
        color={Colors.darkFont}
      />
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    marginVertical: 15,
  },
  description: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default withNavigation(AccountScreen);
