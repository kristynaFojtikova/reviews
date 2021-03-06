import React from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Colors from '../../styles/Colors';
import StarsRow from '../util/StarsRow';
import ReviewsList from '../review/ReviewsList';
import Button from '../util/Button';
import getAverageRatingFor from '../../util/getAverageRatingFor';
import CommonStyles from '../../styles/CommonStyles';
import { useRestaurantContext } from '../../context/RestaurantContext';
import Spacer from '../util/Spacer';

const AdminRestaurantDetail = ({ navigation }) => {
  const { restaurant, deleteRestaurant, deleteRestaurantLoading } = useRestaurantContext();

  const { reviews } = restaurant;

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
      {reviews.length > 0 && (
        <>
          <Text style={CommonStyles.subtitle}>All Reviews</Text>
          <ReviewsList reviews={reviews} />
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

export default withNavigation(AdminRestaurantDetail);
