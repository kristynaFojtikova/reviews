import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../styles/Colors';

const CheckmarkInput = ({ disabled, label, checked, onToggle }) => {
  const iconName = checked ? 'check-circle' : 'radio-button-unchecked';
  const color = checked ? Colors.primary : Colors.darkFont;
  return (
    <TouchableOpacity
      style={disabled ? { ...styles.container, ...styles.disabled } : styles.container}
      onPress={onToggle}
    >
      <Icon name={iconName} color={color} />
      {label && (
        <Text style={checked ? { ...styles.label, ...styles.checked } : styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    marginLeft: 5,
    color: Colors.darkFont,
    fontWeight: '400',
  },
  checked: {
    color: Colors.primary,
  },
});

export default CheckmarkInput;
