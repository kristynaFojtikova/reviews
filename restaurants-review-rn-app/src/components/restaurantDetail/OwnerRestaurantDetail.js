import React from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Colors from '../../styles/Colors';
import StarsRow from '../StarsRow';
import ReviewsList from '../ReviewsList';
import Button from '../util/Button';
import Spacer from '../util/Spacer';
import getAverageRatingFor from '../../util/getAverageRatingFor';
import { useRestaurantContext } from '../../context/RestaurantContext';
import CommonStyles from '../../styles/CommonStyles';

const OwnerRestaurantDetail = ({ navigation }) => {
  const { restaurant, deleteRestaurant, deleteRestaurantLoading } = useRestaurantContext();

  const { reviews } = restaurant;
  const pendingReviews = reviews.filter((review) => review.status === 'PENDING');

  const avgRating = getAverageRatingFor(restaurant);

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
      {pendingReviews.length > 0 && (
        <>
          <Text style={CommonStyles.subtitle}>Pending Reviews</Text>
          <ReviewsList reviews={pendingReviews} />
        </>
      )}
      <View style={CommonStyles.contentContainer}>
        <Button
          text="Edit restaurant"
          iconName="edit"
          color={Colors.primary}
          onPress={() => navigation.navigate('RestaurantForm')}
        />
        <Spacer />
        <Button
          text="Delete restaurant"
          iconName="warning"
          color={Colors.darkFont}
          onPress={deleteRestaurant}
          loading={deleteRestaurantLoading}
        />
      </View>
    </>
  );
};

export default withNavigation(OwnerRestaurantDetail);
