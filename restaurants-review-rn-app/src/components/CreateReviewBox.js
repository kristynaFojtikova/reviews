import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../styles/Colors';
import Button from './util/Button';
import Spacer from './util/Spacer';
import FormInput from './form/FormInput';

const CreateReviewBox = ({ onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);

  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setRating(index + 1);
        }}
      >
        <Icon name={rating > index ? 'star' : 'star-outline'} color={Colors.darkFont} size={50} />
      </TouchableOpacity>
    );
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Leave a review</Text>
        <View style={styles.row}>{stars}</View>
        <FormInput
          label={'You can leave a comment with your rating:'}
          value={comment}
          setValue={setComment}
          tintColor={Colors.darkFont}
        />
        <Button
          text={'Submit your review'}
          iconName="send"
          onPress={() => onSubmit({ rating, comment })}
          loading={loading}
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
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    flex: 1,
    height: 50,
    justifyContent: 'space-between',
  },
  subtitle: {
    marginBottom: 10,
    color: Colors.darkFont,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default CreateReviewBox;
