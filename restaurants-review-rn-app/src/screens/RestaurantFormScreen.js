import React, { useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

import RestaurantForm from '../components/form/RestaurantForm';
import { useRestaurantsContext } from '../context/RestaurantsContext';
import { useRestaurantContext } from '../context/RestaurantContext';
import CommonStyles from '../styles/CommonStyles';

const RestaurantFormScreen = ({ navigation }) => {
  const { restaurantsFetch } = useRestaurantsContext();
  const {
    restaurant: item,
    restaurantFetch,
    createRestaurant,
    createRestaurantLoading,
    createRestaurantSuccess,
    setCreateRestaurantSuccess,
    editRestaurant,
    editRestaurantLoading,
    editRestaurantSuccess,
    setEditRestaurantSuccess,
    error,
    setError,
  } = useRestaurantContext();

  const onSubmit = ({ name, description }) => {
    if (!item) {
      createRestaurant({ name, description });
    } else {
      editRestaurant({ name, description });
    }
  };

  useEffect(() => {
    if (createRestaurantSuccess || editRestaurantSuccess) {
      restaurantsFetch();
      restaurantFetch();
      setCreateRestaurantSuccess();
      setEditRestaurantSuccess();
      navigation.pop();
    }
  }, [createRestaurantSuccess, editRestaurantSuccess]);

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
      <RestaurantForm
        onSubmit={onSubmit}
        loading={createRestaurantLoading || editRestaurantLoading}
        item={item}
      />
    </SafeAreaView>
  );
};

RestaurantFormScreen.navigationOptions = {
  header: () => false,
};

export default withNavigation(RestaurantFormScreen);
