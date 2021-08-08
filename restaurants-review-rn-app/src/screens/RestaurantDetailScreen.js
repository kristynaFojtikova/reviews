import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  View,
} from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { withNavigation } from 'react-navigation';
import Colors from '../styles/Colors';
import * as R from 'ramda';

import ImagesScroller from '../components/ImagesScroller';
import useAuthContext from '../context/useAuthContext';
import { ScrollView } from 'react-native';
import CREATE_REVIEW from '../graphql/mutations/CREATE_REVIEW';
import RESTAURANT from '../graphql/queries/RESTAURANT';
import CenteringView from '../components/util/CenteringView';
import Button from '../components/util/Button';
import DELETE_RESTAURANT from '../graphql/mutations/DELETE_RESTAURANT';
import Spacer from '../components/util/Spacer';
import ReviewsList from '../components/ReviewsList';
import RestaurantDetail from '../components/restaurantDetail';

const RestaurantDetailScreen = ({ navigation }) => {
  // MARK: - Mutations & Queries
  const [
    createReview,
    { data: createReviewData, loading: createReviewLoading, error: createReviewError },
  ] = useMutation(CREATE_REVIEW);
  const [
    deleteRestaurant,
    { data: deleteRestaurantData, loading: deleteRestaurantLoading, error: deleteRestaurantError },
  ] = useMutation(DELETE_RESTAURANT);
  const restaurantId = navigation.state.params.id;
  const {
    _,
    error: restaurantError,
    data: restaurantData,
    refetch: refetchRestaurant,
  } = useQuery(RESTAURANT, {
    variables: {
      id: restaurantId,
    },
    fetchPolicy: 'no-cache',
  });

  // MARK: - Handle data & error changes alerts

  useEffect(() => {
    if (createReviewData) {
      Alert.alert(
        'Feedback Submitted!',
        'Thank you for your feedback, your review needs to be approved by the owner before it will be visible!'
      );
      refetchRestaurant();
    }
  }, [createReviewData]);

  useEffect(() => {
    if (deleteRestaurantData) {
      const callback = R.path(['state', 'params', 'callback'], navigation);
      if (callback) {
        callback();
      }
      navigation.navigate('RestaurantList');
      Alert.alert('Success!', 'Your restaurant has been deleted!');
    }
  }, [deleteRestaurantData]);

  useEffect(() => {
    const error = createReviewError || deleteRestaurantError;
    if (error) {
      let message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
    }
  }, [createReviewError, deleteRestaurantError]);

  // MARK: - Hooks & local data

  const { state } = useAuthContext();
  const role = R.path(['user', 'role'], state);
  const userId = R.path(['user', 'id'], state);

  const item = R.path(['restaurant'], restaurantData);

  // MARK: - Actions

  const onPressCreateReview = ({ rating, comment }) => {
    createReview({
      variables: { input: { restaurantId: id, rating, userComment: comment } },
    });
  };

  // MARK: - Render

  if (!item) {
    return (
      <CenteringView>
        <ActivityIndicator color={Colors.primary} />
      </CenteringView>
    );
  }

  const { id, name, description, reviews } = item;
  const isOwner = role === 'OWNER';
  const isAdmin = role === 'ADMIN';
  const isCustomer = role === 'CUSTOMER';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{name}</Text>
        <ImagesScroller id={id} />
        <Text style={styles.description}>{description}</Text>
        <RestaurantDetail
          reviews={reviews}
          callback={refetchRestaurant}
          role={role}
          createReviewLoading={createReviewLoading}
          createReview={onPressCreateReview}
          deleteRestaurant={deleteRestaurant}
          item={item}
          deleteRestaurantLoading={deleteRestaurantLoading}
          refetchList={() => {
            const callback = R.path(['state', 'params', 'callback'], navigation);
            if (callback) {
              callback();
            }
          }}
        />
      </ScrollView>
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
  subtitle: {
    margin: 15,
    color: Colors.darkFont,
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    margin: 15,
    color: Colors.darkFont,
    fontSize: 14,
  },
  contentContainer: {
    margin: 15,
  },
});

export default withNavigation(RestaurantDetailScreen);
