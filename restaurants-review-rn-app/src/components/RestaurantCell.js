import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import * as R from 'ramda';
import { Icon } from 'react-native-elements';
import Colors from '../styles/Colors';
import ImagesScroller from './ImagesScroller';
import StarsRow from './StarsRow';
import getAverageRatingFor from '../util/getAverageRatingFor';

const RestaurantCell = ({ item, onPress }) => {
  const { id, name, description, reviews } = item;

  const averageRating = getAverageRatingFor(item);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.topContentContainer}>
        <Text style={styles.title}>{name}</Text>
        <StarsRow rating={averageRating} disabled small />
      </View>
      <ImagesScroller id={id} />
      <View style={styles.bottomContentContainer}>
        <Text style={styles.description}>{description}</Text>
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
});

export default RestaurantCell;
