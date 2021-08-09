import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../styles/Colors';
import Button from './util/Button';
import FormInput from './form/FormInput';
import StarsRow from './StarsRow';
import { useRestaurantContext } from '../context/RestaurantContext';

const CreateReviewBox = () => {
  const { createReview, createReviewLoading } = useRestaurantContext();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Leave a review</Text>
        <StarsRow rating={rating} setRating={setRating} />
        <FormInput
          label="You can leave a comment with your rating:"
          value={comment}
          setValue={setComment}
          tintColor={Colors.darkFont}
        />
        <Button
          text="Submit your review"
          iconName="send"
          onPress={() => createReview({ rating, comment })}
          loading={createReviewLoading}
          color={Colors.darkFont}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    margin: 15,
  },
  subtitle: {
    marginBottom: 10,
    color: Colors.darkFont,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default CreateReviewBox;
