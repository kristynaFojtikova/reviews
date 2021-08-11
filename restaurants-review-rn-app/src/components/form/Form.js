import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../styles/Colors';

import Button from '../util/Button';
import Spacer from '../util/Spacer';

const Form = ({
  headerText,
  submitButtonText,
  buttonIcon,
  onSubmit,
  children,
  loading,
  footer,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{headerText}</Text>
    <Spacer height={30} />
    {children}
    <Spacer />
    <Button text={submitButtonText} onPress={onSubmit} loading={loading} iconName={buttonIcon} />
    {footer && footer()}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteAplha,
    padding: 20,
    margin: 5,
    borderRadius: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
  },
});

export default Form;
