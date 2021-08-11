import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../../styles/Colors';

const StarsRow = ({ rating, setRating, color = Colors.darkFont, disabled, small }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <TouchableOpacity
      onPress={() => {
        if (rating === index + 1) {
          setRating(null);
        } else {
          setRating(index + 1);
        }
      }}
      key={index}
      disabled={disabled}
    >
      <Icon name={rating > index ? 'star' : 'star-outline'} color={color} size={small ? 20 : 50} />
    </TouchableOpacity>
  ));
  return <View style={small ? { ...styles.row, ...styles.small } : styles.row}>{stars}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    flex: 1,
    height: 50,
    justifyContent: 'space-between',
  },
  small: {
    height: 20,
    width: 115,
  },
});

export default StarsRow;
