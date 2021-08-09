import React, { useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import Colors from '../styles/Colors';
import ImagesScroller from '../components/ImagesScroller';
import CenteringView from '../components/util/CenteringView';
import RestaurantDetail from '../components/restaurantDetail';
import { useRestaurantsContext } from '../context/RestaurantsContext';
import { useRestaurantContext } from '../context/RestaurantContext';
import Button from '../components/util/Button';

const RestaurantDetailScreen = ({ navigation }) => {
  const { restaurantsFetch } = useRestaurantsContext();
  const {
    restaurant,
    restaurantFetch,
    createReviewSuccess,
    setCreateReviewSuccess,
    deleteRestaurantSuccess,
    setDeleteRestaurantSuccess,
    error,
    setError,
  } = useRestaurantContext();

  // MARK: - Handle success & error alerts

  useEffect(() => {
    if (createReviewSuccess) {
      Alert.alert(
        'Feedback Submitted!',
        'Thank you for your feedback, your review needs to be approved by the owner before it will be visible!'
      );
      restaurantFetch();
      setCreateReviewSuccess();
    }
  }, [createReviewSuccess]);

  useEffect(() => {
    if (deleteRestaurantSuccess) {
      restaurantsFetch();
      setDeleteRestaurantSuccess();
      navigation.navigate('RestaurantList');
      Alert.alert('Success!', 'Your restaurant has been deleted!');
      setDeleteRestaurantSuccess();
    }
  }, [deleteRestaurantSuccess]);

  useEffect(() => {
    if (error) {
      const message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
      setError();
    }
  }, [error]);

  // MARK: - Render

  if (!restaurant) {
    return (
      <CenteringView>
        <ActivityIndicator color={Colors.primary} />
      </CenteringView>
    );
  }

  const { id, name, description, reviews } = restaurant;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>{name}</Text>
            <ImagesScroller id={id} />
            <Text style={styles.description}>{description}</Text>
            <RestaurantDetail />
          </>
        )}
      />
    </SafeAreaView>
  );
};

RestaurantDetailScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {},
  title: {
    margin: 15,
    fontSize: 40,
    fontWeight: '800',
  },
  description: {
    margin: 15,
    color: Colors.darkFont,
    fontSize: 14,
  },
});

export default withNavigation(RestaurantDetailScreen);
