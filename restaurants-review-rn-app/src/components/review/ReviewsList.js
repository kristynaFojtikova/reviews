import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Colors from '../../styles/Colors';
import ReviewCell from './ReviewCell';

const ReviewsList = ({ reviews }) => (
  <>
    <FlatList
      style={styles.list}
      data={reviews}
      renderItem={({ item }) => <ReviewCell item={item} />}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
    />
  </>
);

const styles = StyleSheet.create({
  subtitle: {
    marginHorizontal: 15,
    color: Colors.darkFont,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ReviewsList;
