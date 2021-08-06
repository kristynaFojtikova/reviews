import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../../styles/Colors';

const LinkButton = ({ disabled, text, onPress }) => {
  const content = () => {
    return <Text style={styles.text}>{text}</Text>;
  };

  return (
    <TouchableOpacity
      style={disabled ? { ...styles.container, ...styles.disabledContainer } : styles.container}
      onPress={onPress}
      disabled={disabled}
    >
      {content()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  text: {
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LinkButton;
