import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import Colors from '../styles/Colors';
import ReviewCell from './ReviewCell';
import Spacer from './util/Spacer';

const ReviewsList = ({ reviews, callback }) => {
  return (
    <>
      {/* {reviews && reviews.length > 0 && <Text style={styles.subtitle}>Reviews</Text>} */}
      <FlatList
        style={styles.list}
        data={reviews}
        renderItem={({ item }) => <ReviewCell item={item} callback={callback} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginHorizontal: 15,
    color: Colors.darkFont,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ReviewsList;
