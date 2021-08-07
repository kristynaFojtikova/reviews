import React, { useState } from 'react';
import * as R from 'ramda';

import { nameRegex, descriptionRegex } from '../util/regex';
import Form from './form/Form';
import CheckmarkInput from './form/CheckmarkInput';
import FormInput from './form/FormInput';
import Button from './util/Button';

const RestaurantForm = ({ onSubmit, loading, item }) => {
  const [name, setName] = useState(R.prop('name', item) || `John's`);
  const [description, setDescription] = useState(R.prop('description', item) || 'John has food');

  const [nameError, setNameError] = useState();

  const validateName = () => {
    if (!name) {
      setNameError('Required field');
      return false;
    }
    setNameError(null);
    return true;
  };

  const formValid = () => {
    if (validateName()) {
      return true;
    }
    return false;
  };

  const onSubmitPressed = () => {
    if (!formValid()) {
      return;
    }
    onSubmit({ name: name, description });
  };

  return (
    <Form
      headerText={item ? 'Edit restaurant' : 'Create a restaurant'}
      submitButtonText={item ? 'Save' : 'Create'}
      onSubmit={onSubmitPressed}
      loading={loading}
    >
      <FormInput
        label={'Restaurant Name'}
        value={name}
        setValue={setName}
        error={nameError}
        validate={validateName}
      />
      <FormInput label={'Description'} value={description} setValue={setDescription} />
    </Form>
  );
};

export default RestaurantForm;
