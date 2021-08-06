import React from 'react';
import { View } from 'react-native';

const Spacer = ({ height = 15 }) => {
  const styles = {
    spacer: {
      height: height,
    },
  };
  return <View style={styles.spacer} />;
};

export default Spacer;
