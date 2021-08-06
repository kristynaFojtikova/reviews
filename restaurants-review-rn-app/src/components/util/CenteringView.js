import React from 'react';
import { View, StyleSheet } from 'react-native';

const CenteringView = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CenteringView;
