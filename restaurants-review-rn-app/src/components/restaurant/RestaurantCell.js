import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../../styles/Colors';
import ImagesScroller from '../util/ImagesScroller';
import StarsRow from '../util/StarsRow';
import getAverageRatingFor from '../../util/getAverageRatingFor';

const RestaurantCell = ({ item, onPress }) => {
  const { id, name, description, reviews } = item;

  const averageRating = getAverageRatingFor(item);
  const pendingReviews = reviews.filter((review) => review.status === 'PENDING');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.topContentContainer}>
        <Text style={styles.title}>{name}</Text>
        <StarsRow rating={averageRating} disabled small />
      </View>
      <ImagesScroller id={id} />
      <View style={styles.bottomContentContainer}>
        <Text style={styles.description}>{description}</Text>
        {pendingReviews && pendingReviews.length > 0 && (
          <Text style={styles.pending}>Review pending approval</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  topContentContainer: {
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  bottomContentContainer: {
    marginHorizontal: 15,
    paddingVertical: 15,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  title: {
    color: Colors.darkFont,
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    color: Colors.darkFont,
    fontSize: 14,
  },
  pending: {
    color: Colors.error,
    fontSize: 14,
  },
});

export default RestaurantCell;
