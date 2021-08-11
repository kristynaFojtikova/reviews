import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

const LinkButton = ({ disabled, text, onPress, color = Colors.primary }) => {
  const content = () => <Text style={{ ...styles.text, color }}>{text}</Text>;

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
    padding: 10,
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
