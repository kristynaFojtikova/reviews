import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../styles/Colors';
import { emailRegex } from '../../util/regex';
import CheckmarkInput from './CheckmarkInput';
import FormInput from './FormInput';
import Button from '../util/Button';
import LinkButton from '../util/LinkButton';
import Spacer from '../util/Spacer';

const Form = ({ headerText, submitButtonText, onSubmit, children, loading }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerText}</Text>
      <Spacer height={30} />
      {children}
      <Spacer />
      <Button text={submitButtonText} onPress={onSubmit} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightFont,
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
  },
});

export default Form;
