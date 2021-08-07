import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View } from 'react-native';
import * as R from 'ramda';

import Colors from '../../styles/Colors';
import StarsRow from './../StarsRow';
import ReviewCell from './../ReviewCell';
import ReviewsList from './../ReviewsList';
import useAuthContext from '../../context/useAuthContext';
import CreateReviewBox from '../CreateReviewBox';

const CustomerRestaurantDetail = ({ reviews, callback, createReviewLoading, createReview }) => {
  const relevantReviews = reviews.filter((review) => review.status === 'APPROVED');
  const { state } = useAuthContext();
  const role = R.path(['user', 'role'], state);
  const userId = R.path(['user', 'id'], state);

  const highestReview =
    relevantReviews.length > 0
      ? relevantReviews.reduce((max, review) => (max.rating > review.rating ? max : review))
      : null;
  const lowestReview =
    relevantReviews.length > 0
      ? relevantReviews.reduce((min, review) => (min.rating < review.rating ? min : review))
      : null;

  const latestReviews =
    relevantReviews.length > 0
      ? relevantReviews
          .sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return -1;
            }
            if (a.createdAt > b.createdAt) {
              return 1;
            }
            return 0;
          })
          .slice(0, 5)
      : null;

  const avgRating =
    relevantReviews.length > 0
      ? Math.floor(
          relevantReviews.reduce((total, review) => total + review.rating, 0) /
            relevantReviews.length
        )
      : null;

  const alreadyReviewed = reviews.find((review) => {
    return review.reviewerId === userId;
  });

  return (
    <>
      {avgRating && (
        <>
          <Text style={styles.subtitle}>Average Rating</Text>
          <View style={styles.contentContainer}>
            <StarsRow rating={avgRating} disabled />
          </View>
        </>
      )}
      {!alreadyReviewed && (
        <CreateReviewBox onSubmit={createReview} loading={createReviewLoading} />
      )}
      {highestReview && (
        <>
          <Text style={styles.subtitle}>Best Review</Text>
          <ReviewCell item={highestReview} callback={callback} />
        </>
      )}
      {lowestReview && (
        <>
          <Text style={styles.subtitle}>Worst Review</Text>
          <ReviewCell item={lowestReview} callback={callback} />
        </>
      )}
      {latestReviews && (
        <>
          <Text style={styles.subtitle}>Latest Reviews</Text>
          <ReviewsList reviews={latestReviews} callback={callback} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    margin: 15,
    color: Colors.darkFont,
    fontSize: 24,
    fontWeight: '600',
  },

  contentContainer: {
    margin: 15,
  },
});

export default CustomerRestaurantDetail;
