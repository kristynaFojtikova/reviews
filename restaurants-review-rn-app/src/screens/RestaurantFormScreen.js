import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { withNavigation } from 'react-navigation';
import * as R from 'ramda';

import REGISTER from '../graphql/mutations/REGISTER';
import UserForm from '../components/UserForm';
import LinkButton from '../components/util/LinkButton';
import useAuthContext from '../context/useAuthContext';
import Spacer from '../components/util/Spacer';
import RestaurantForm from '../components/RestaurantForm';
import CREATE_RESTAURANT from '../graphql/mutations/CREATE_RESTAURANT';
import EDIT_RESTAURANT from '../graphql/mutations/EDIT_RESTAURANT';

const RestaurantFormScreen = ({ navigation }) => {
  const { signin } = useAuthContext();

  const item = R.path(['state', 'params', 'item'], navigation);
  const mutation = item ? EDIT_RESTAURANT : CREATE_RESTAURANT;
  const [action, { data, loading, error }] = useMutation(mutation);

  const onSubmit = ({ name, description }) => {
    if (!item) {
      action({ variables: { input: { name, description } } });
    } else {
      const { id } = item;
      action({ variables: { input: { name, description, id } } });
    }
  };

  useEffect(() => {
    if (data) {
      const callback = R.path(['state', 'params', 'callback'], navigation);
      if (callback) {
        callback();
      }
      navigation.pop();
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
      <RestaurantForm onSubmit={onSubmit} loading={loading} item={item} />
    </SafeAreaView>
  );
};

RestaurantFormScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withNavigation(RestaurantFormScreen);
