import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';

import Colors from '../styles/Colors';
import Button from './util/Button';
import Spacer from './util/Spacer';
import FormInput from './form/FormInput';
import { useAuthContext } from '../context/AuthContext';
import userDetailsHandle from '../util/userDetailsHandle';
import { useRestaurantContext } from '../context/RestaurantContext';

const ReviewCell = ({ item }) => {
  // MARK: - Hooks & local state
  const [ownerReplyInput, setOwnerReplyInput] = useState();

  const {
    approveReviewLoading,
    deleteReviewLoading,
    approveReview,
    deleteReview,
    approveReviewSuccess,
    setApproveReviewSuccess,
    deleteReviewSuccess,
    setDeleteReviewSuccess,
    restaurantFetch,
  } = useRestaurantContext();

  useEffect(() => {
    if (approveReviewSuccess) {
      restaurantFetch();
      setApproveReviewSuccess();
    }
  }, [approveReviewSuccess]);

  useEffect(() => {
    if (deleteReviewSuccess) {
      restaurantFetch();
      setDeleteReviewSuccess();
    }
  }, [deleteReviewSuccess]);

  const { user } = useAuthContext();
  const { isAdmin, isOwner, id: userId } = userDetailsHandle(user);
  const { rating, userComment, ownerComment, status, reviewerId, id, createdAt } = item;
  const isReviewer = userId === reviewerId;

  // MARK: - Actions

  const onApprove = (approved) => {
    approveReview({ approved, ownerComment: ownerReplyInput || ownerComment, id });
  };
  const onDelete = () => {
    deleteReview({ id });
  };

  // MARK: - Render

  const stars = Array.from({ length: 5 }, (_, index) => (
    <Icon name={rating > index ? 'star' : 'star-outline'} color={Colors.primary} />
  ));

  const formattedDate = format(new Date(createdAt), 'd MMM yyyy');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{formattedDate}</Text>
      <Text style={styles.label}>Rating:</Text>
      <View style={styles.row}>{stars}</View>
      {(isOwner || isAdmin) && (
        <>
          <Text style={styles.label}>Review status:</Text>
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
              label="You can reply to this customer:"
              value={ownerReplyInput}
              setValue={setOwnerReplyInput}
            />
          )}
          {status !== 'APPROVED' && (
            <>
              <Spacer height={10} />
              <Button
                text="Approve review"
                iconName="check"
                onPress={() => onApprove(true)}
                loading={approveReviewLoading}
              />
            </>
          )}
          {status !== 'DISAPROVED' && (
            <>
              <Spacer height={10} />
              <Button
                text="Dissaprove review"
                iconName="do-not-disturb"
                color={Colors.error}
                onPress={() => onApprove(false)}
                loading={approveReviewLoading}
              />
            </>
          )}
        </>
      )}
      {isAdmin && (
        <>
          <Spacer height={10} />
          <Button
            text="Delete review"
            iconName="delete"
            color={Colors.error}
            onPress={onDelete}
            loading={deleteReviewLoading}
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
