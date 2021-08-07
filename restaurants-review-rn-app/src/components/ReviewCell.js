import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { Icon } from 'react-native-elements';
import * as R from 'ramda';
import { format } from 'date-fns';

import Colors from '../styles/Colors';
import Button from './util/Button';
import Spacer from './util/Spacer';
import FormInput from './form/FormInput';
import useAuthContext from '../context/useAuthContext';
import DELETE_REVIEW from '../graphql/mutations/DELETE_REVIEW';
import APPROVE_REVIEW from '../graphql/mutations/APPROVE_REVIEW';

const ReviewCell = ({ item, callback }) => {
  // MARK: - Mutations
  const [approveReview, { data: approveData, loading: approveLoading, error: approveError }] =
    useMutation(APPROVE_REVIEW);
  const [deleteReview, { data: deleteData, loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_REVIEW);

  useEffect(() => {
    const data = approveData || deleteData;
    if (data) {
      if (callback) {
        callback();
      }
    }
  }, [approveData, deleteData]);

  useEffect(() => {
    const error = deleteError || approveError;
    if (error) {
      let message =
        error.message || 'There was a problem with your request, please try again later';

      Alert.alert('Ooops!', message);
    }
    // TODO: - Graphql error handle & check network error
  }, [approveError, deleteError]);

  // MARK: - Hooks & local state

  const { state } = useAuthContext();
  const [composedOwnerReply, setComposedOwnerReply] = useState();

  // MARK: - Actions

  const onApprove = (approved) => {
    approveReview({
      variables: { input: { approved, ownerComment: composedOwnerReply || ownerComment, id } },
    });
  };
  const onDelete = () => {
    deleteReview({
      variables: { id },
    });
  };

  // MARK: - Render

  const role = R.path(['user', 'role'], state);
  const userId = R.path(['user', 'id'], state);
  const { rating, userComment, ownerComment, status, reviewerId, id, createdAt } = item;

  const isOwner = role === 'OWNER';
  const isAdmin = role === 'ADMIN';
  const isCustomer = role === 'CUSTOMER';
  const isReviewer = userId === reviewerId;

  const stars = Array.from({ length: 5 }, (_, index) => {
    return <Icon name={rating > index ? 'star' : 'star-outline'} color={Colors.primary} />;
  });

  const formattedDate = format(new Date(createdAt), 'd MMM yyyy');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{formattedDate}</Text>
      <Text style={styles.label}>{'Rating:'}</Text>
      <View style={styles.row}>{stars}</View>
      {(isOwner || isAdmin) && (
        <>
          <Text style={styles.label}>{'Review status:'}</Text>
          <Text style={styles.status}>{status}</Text>
        </>
      )}
      {userComment && (
        <Text style={styles.label}>{isReviewer ? 'Your comment:' : 'Reviewer comment:'}</Text>
      )}
      {userComment && <Text style={styles.comment}>{userComment}</Text>}
      {ownerComment && (
        <Text style={styles.label}>{isOwner ? 'Your reply:' : 'Owner replied:'}</Text>
      )}
      {ownerComment && <Text style={styles.comment}>{ownerComment}</Text>}
      {isOwner && (
        <>
          {!ownerComment && status !== 'APPROVED' && (
            <FormInput
              label={'You can reply to this customer:'}
              value={composedOwnerReply}
              setValue={setComposedOwnerReply}
            />
          )}
          {status !== 'APPROVED' && (
            <>
              <Spacer height={10} />
              <Button
                text={'Approve review'}
                iconName="check"
                onPress={() => onApprove(true)}
                loading={approveLoading}
              />
            </>
          )}
          {status !== 'DISAPROVED' && (
            <>
              <Spacer height={10} />
              <Button
                text={'Dissaprove review'}
                iconName="do-not-disturb"
                color={Colors.error}
                onPress={() => onApprove(false)}
                loading={approveLoading}
              />
            </>
          )}
        </>
      )}
      {isAdmin && (
        <>
          <Spacer height={10} />
          <Button
            text={'Delete review'}
            iconName="delete"
            color={Colors.error}
            onPress={onDelete}
            loading={deleteLoading}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    color: Colors.darkFont,
    fontSize: 14,
    marginVertical: 5,
  },
  comment: {
    color: Colors.primary,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: '600',
  },
  status: {
    color: Colors.darkFont,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: '600',
  },
});

export default ReviewCell;
