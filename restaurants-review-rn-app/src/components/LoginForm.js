import React, { useState } from 'react';

import { emailRegex, passwordRegex } from '../util/regex';
import Form from './form/Form';
import FormInput from './form/FormInput';
import Button from './util/Button';
import LinkButton from './util/LinkButton';

const LoginForm = ({ onSubmit, loading }) => {
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
    >
      <FormInput
        label={'Email'}
        value={email}
        setValue={setEmail}
        error={emailError}
        validate={validateEmail}
        placeholder="customer@grr.la"
      />
      <FormInput
        label={'Password'}
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

export default LoginForm;
