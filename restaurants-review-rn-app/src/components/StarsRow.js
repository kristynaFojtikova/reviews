import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../styles/Colors';

const StarsRow = ({ rating, setRating, color = Colors.darkFont, disabled }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setRating(index + 1);
        }}
        disabled={disabled}
      >
        <Icon name={rating > index ? 'star' : 'star-outline'} color={color} size={50} />
      </TouchableOpacity>
    );
  });
  return <View style={styles.row}>{stars}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    flex: 1,
    height: 50,
    justifyContent: 'space-between',
  },
});

export default StarsRow;
