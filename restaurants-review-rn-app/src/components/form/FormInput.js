import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../../styles/Colors';

const FormInput = ({
  disabled,
  label,
  secureTextEntry,
  value,
  setValue,
  error,
  validate,
  tintColor,
  placeholder,
}) => (
  <View style={disabled ? { ...styles.container, ...styles.disabled } : styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      editable={!disabled}
      secureTextEntry={secureTextEntry}
      style={tintColor ? { ...styles.input, borderBottomColor: tintColor } : styles.input}
      value={value}
      onChangeText={(text) => setValue(text)}
      onEndEditing={validate}
      placeholder={placeholder}
    />
    {error && (
      <View style={styles.errorContainer}>
        <Icon name="warning" color={Colors.error} />
        <Text style={styles.error}>{error}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  disabled: {
    opacity: 0.5,
  },

  label: {
    color: Colors.darkFont,
    fontWeight: '500',
  },
  input: {
    fontWeight: '300',
    fontSize: 18,
    height: 40,
    color: Colors.darkFont,
    justifyContent: 'center',
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    marginTop: 5,
  },
  error: {
    color: Colors.error,
    marginLeft: 5,
    fontWeight: '400',
  },
});

export default FormInput;
