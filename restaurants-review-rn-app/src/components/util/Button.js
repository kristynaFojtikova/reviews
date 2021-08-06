import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../../styles/Colors';

const Button = ({ disabled, loading, text, icon, onPress }) => {
  const content = () => {
    if (loading) {
      return <ActivityIndicator color={Colors.lightFont} />;
    }
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
    padding: 10,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  text: {
    color: Colors.lightFont,
    fontWeight: '600',
    fontSize: 24,
  },
});

export default Button;
