import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../../styles/Colors';
import { Icon } from 'react-native-elements';

const FloatingButton = ({
  disabled,
  loading,
  iconName = 'add',
  onPress,
  color,
  tintColor = Colors.lightFont,
}) => {
  return (
    <TouchableOpacity
      style={
        disabled
          ? { ...styles.container, ...styles.disabledContainer, backgroundColor: color }
          : { ...styles.container, backgroundColor: color }
      }
      onPress={onPress}
      disabled={disabled}
    >
      {loading && <ActivityIndicator color={tintColor} />}
      {!loading && <Icon name={iconName} color={tintColor} size={40} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  disabledContainer: {
    opacity: 0.5,
  },
});

export default FloatingButton;
