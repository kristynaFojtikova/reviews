import React, { useState } from 'react';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { withNavigation } from 'react-navigation';
import { emailRegex } from '../../util/regex';
import Form from './Form';
import FormInput from './FormInput';
import LinkButton from '../util/LinkButton';

const LoginForm = ({ onSubmit, loading, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const validateEmail = () => {
    if (!email) {
      setEmailError('Required field');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Required field');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const formValid = () => {
    if (validateEmail() && validatePassword()) {
      return true;
    }
    return false;
  };

  const onSubmitPressed = () => {
    if (!formValid()) {
      return;
    }
    const lowercasedEmail = email.toLowerCase();
    onSubmit({ email: lowercasedEmail, password });
  };

  return (
    <Form
      headerText="Welcome!"
      submitButtonText="Login"
      buttonIcon="rowing"
      onSubmit={onSubmitPressed}
      loading={loading}
      footer={() => (
        <LinkButton
          text="Don't have an account? Register"
          onPress={() => navigation.navigate('Register')}
        />
      )}
    >
      <FormInput
        label="Email"
        value={email}
        setValue={setEmail}
        error={emailError}
        validate={validateEmail}
        placeholder="customer@grr.la"
      />
      <FormInput
        label="Password"
        secureTextEntry
        value={password}
        setValue={setPassword}
        error={passwordError}
        validate={validatePassword}
        placeholder="test123"
      />
      {__DEV__ && (
        <>
          <LinkButton
            text="__DEV__: prefil to customer"
            onPress={() => {
              setEmail('customer2@grr.la');
              setPassword('Testing123!');
            }}
          />
          <LinkButton
            text="__DEV__: prefil to owner"
            onPress={() => {
              setEmail('owner@grr.la');
              setPassword('test123');
            }}
          />
          <LinkButton
            text="__DEV__: prefil to admin"
            onPress={() => {
              setEmail('admin@grr.la');
              setPassword('test123');
            }}
          />
        </>
      )}
    </Form>
  );
};

export default withNavigation(LoginForm);
