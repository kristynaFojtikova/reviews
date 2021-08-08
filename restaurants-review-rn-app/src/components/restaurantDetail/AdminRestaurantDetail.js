import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View } from 'react-native';
import * as R from 'ramda';

import Colors from '../../styles/Colors';
import StarsRow from '../StarsRow';
import ReviewCell from '../ReviewCell';
import ReviewsList from '../ReviewsList';
import Button from '../util/Button';
import getAverageRatingFor from '../../util/getAverageRatingFor';

const AdminRestaurantDetail = ({
  reviews,
  callback,
  deleteRestaurant,
  deleteRestaurantLoading,
}) => {
  const approvedReviews = reviews.filter((review) => review.status === 'APPROVED');
  const avgRating = getAverageRatingFor(reviews);

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
      {reviews.length > 0 && (
        <>
          <Text style={styles.subtitle}>All Reviews</Text>
          <ReviewsList reviews={reviews} callback={callback} />
        </>
      )}
      <View style={styles.contentContainer}>
        <Button
          text={'Delete restaurant'}
          iconName="warning"
          color={Colors.darkFont}
          onPress={() => deleteRestaurant({ variables: { id: restaurantId } })}
          loading={deleteRestaurantLoading}
        />
      </View>
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

export default AdminRestaurantDetail;
