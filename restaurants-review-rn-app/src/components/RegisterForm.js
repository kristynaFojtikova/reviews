import React, { useState } from 'react';

import { emailRegex, passwordRegex } from '../util/regex';
import Form from './form/Form';
import CheckmarkInput from './form/CheckmarkInput';
import FormInput from './form/FormInput';
import Button from './util/Button';
import LinkButton from './util/LinkButton';

const RegisterForm = ({ onSubmit, loading }) => {
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
      headerText="Create an account"
      submitButtonText="Register"
      onSubmit={onSubmitPressed}
      loading={loading}
    >
      <FormInput
        label={'Email'}
        value={email}
        setValue={setEmail}
        error={emailError}
        validate={validateEmail}
      />
      <FormInput
        label={'Password'}
        secureTextEntry
        value={password}
        setValue={setPassword}
        error={passwordError}
        validate={validatePassword}
      />
      <CheckmarkInput
        label="I'm an owner"
        checked={role === 'OWNER'}
        onToggle={() => {
          onToggle('OWNER');
        }}
      />
      <CheckmarkInput
        label="I'm admin"
        checked={role === 'ADMIN'}
        onToggle={() => {
          onToggle('ADMIN');
        }}
      />
    </Form>
  );
};

export default RegisterForm;
