import React, { useContext } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import RegisterForm from '../components/RegisterForm';
import { withNavigation } from 'react-navigation';

const SignInScreen = ({ navigation }) => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

SignInScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withNavigation(SignInScreen);
