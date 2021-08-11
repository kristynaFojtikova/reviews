import React, { useState } from 'react';
import * as R from 'ramda';

import { withNavigation } from 'react-navigation';
import { emailRegex, passwordRegex } from '../../util/regex';
import Form from './Form';
import CheckmarkInput from './CheckmarkInput';
import FormInput from './FormInput';
import LinkButton from '../util/LinkButton';

const UserForm = ({ onSubmit, loading, admin, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');

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
    if (!passwordRegex.test(password)) {
      setPasswordError('Make sure to create a strong password!');
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
    onSubmit({ email: lowercasedEmail, password, role });
  };

  const onToggle = (toggledRole) => {
    if (role === toggledRole) {
      setRole('CUSTOMER');
    } else {
      setRole(toggledRole);
    }
  };

  return (
    <Form
      headerText={admin ? 'Create a user' : 'Create an account'}
      submitButtonText="Create"
      buttonIcon="rowing"
      onSubmit={onSubmitPressed}
      loading={loading}
      footer={() =>
        admin ? null : (
          <LinkButton
            text="Already have an account? Log in"
            onPress={() => navigation.navigate('Signin')}
          />
        )
      }
    >
      <FormInput
        label="Email"
        value={email}
        setValue={setEmail}
        error={emailError}
        validate={validateEmail}
      />
      <FormInput
        label="Password"
        secureTextEntry
        value={password}
        setValue={setPassword}
        error={passwordError}
        validate={validatePassword}
      />
      <CheckmarkInput
        label={admin ? 'User is owner' : "I'm an owner"}
        checked={role === 'OWNER'}
        onToggle={() => {
          onToggle('OWNER');
        }}
      />
      <CheckmarkInput
        label={admin ? 'User is admin' : "I'm an admin"}
        checked={role === 'ADMIN'}
        onToggle={() => {
          onToggle('ADMIN');
        }}
      />
    </Form>
  );
};

export default withNavigation(UserForm);
