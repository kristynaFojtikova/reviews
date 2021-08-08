import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View } from 'react-native';
import * as R from 'ramda';
import { withNavigation } from 'react-navigation';

import Colors from '../../styles/Colors';
import StarsRow from '../StarsRow';
import ReviewCell from '../ReviewCell';
import ReviewsList from '../ReviewsList';
import Button from '../util/Button';
import Spacer from '../util/Spacer';
import getAverageRatingFor from '../../util/getAverageRatingFor';

const OwnerRestaurantDetail = ({
  reviews,
  callback,
  refetchList,
  deleteRestaurant,
  deleteRestaurantLoading,
  navigation,
  item,
}) => {
  const pendingReviews = reviews.filter((review) => review.status === 'PENDING');
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
      {pendingReviews.length > 0 && (
        <>
          <Text style={styles.subtitle}>Pending Reviews</Text>
          <ReviewsList reviews={pendingReviews} callback={callback} />
        </>
      )}
      <View style={styles.contentContainer}>
        <Button
          text={'Edit restaurant'}
          iconName="edit"
          color={Colors.primary}
          onPress={() =>
            navigation.navigate('RestaurantForm', {
              item,
              callback: () => {
                refetchList();
                callback();
              },
            })
          }
        />
        <Spacer />
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

export default withNavigation(OwnerRestaurantDetail);
