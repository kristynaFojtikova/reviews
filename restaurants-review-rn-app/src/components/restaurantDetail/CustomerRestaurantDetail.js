import React from 'react';
import { Text, View } from 'react-native';
import * as R from 'ramda';

import StarsRow from '../util/StarsRow';
import ReviewCell from '../review/ReviewCell';
import ReviewsList from '../review/ReviewsList';
import CreateReviewBox from '../review/CreateReviewBox';
import getAverageRatingFor from '../../util/getAverageRatingFor';
import { useRestaurantContext } from '../../context/RestaurantContext';
import CommonStyles from '../../styles/CommonStyles';
import userDetailsHandle from '../../util/userDetailsHandle';
import { useAuthContext } from '../../context/AuthContext';

const CustomerRestaurantDetail = () => {
  const { restaurant } = useRestaurantContext();

  const { reviews } = restaurant;
  const relevantReviews = reviews.filter((review) => review.status === 'APPROVED');

  const { user } = useAuthContext();
  const { id: userId } = userDetailsHandle(user);

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

  const avgRating = getAverageRatingFor(restaurant);
  const alreadyReviewed = reviews.find((review) => review.reviewerId === userId);

  return (
    <>
      {avgRating && (
        <>
          <Text style={CommonStyles.subtitle}>Average Rating</Text>
          <View style={CommonStyles.contentContainer}>
            <StarsRow rating={avgRating} disabled />
          </View>
        </>
      )}
      {!alreadyReviewed && <CreateReviewBox />}
      {highestReview && (
        <>
          <Text style={CommonStyles.subtitle}>Best Review</Text>
          <ReviewCell item={highestReview} />
        </>
      )}
      {lowestReview && (
        <>
          <Text style={CommonStyles.subtitle}>Worst Review</Text>
          <ReviewCell item={lowestReview} />
        </>
      )}
      {latestReviews && (
        <>
          <Text style={CommonStyles.subtitle}>Latest Reviews</Text>
          <ReviewsList reviews={latestReviews} />
        </>
      )}
    </>
  );
};

export default CustomerRestaurantDetail;
