import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../styles/Colors';

const FloatingButton = ({
  disabled,
  loading,
  iconName = 'add',
  onPress,
  color,
  tintColor = Colors.lightFont,
  size = 40,
}) => (
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
    {!loading && <Icon name={iconName} color={tintColor} size={size} />}
  </TouchableOpacity>
);

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
