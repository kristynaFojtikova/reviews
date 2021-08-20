import React, { createContext, useEffect, useState, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import RESTAURANT from '../graphql/queries/RESTAURANT';
import CREATE_RESTAURANT from '../graphql/mutations/CREATE_RESTAURANT';
import EDIT_RESTAURANT from '../graphql/mutations/EDIT_RESTAURANT';
import DELETE_RESTAURANT from '../graphql/mutations/DELETE_RESTAURANT';
import CREATE_REVIEW from '../graphql/mutations/CREATE_REVIEW';
import APPROVE_REVIEW from '../graphql/mutations/APPROVE_REVIEW';
import DELETE_REVIEW from '../graphql/mutations/DELETE_REVIEW';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [createRestaurantSuccess, setCreateRestaurantSuccess] = useState();
  const [deleteRestaurantSuccess, setDeleteRestaurantSuccess] = useState();
  const [editRestaurantSuccess, setEditRestaurantSuccess] = useState();
  const [createReviewSuccess, setCreateReviewSuccess] = useState();
  const [deleteReviewSuccess, setDeleteReviewSuccess] = useState();
  const [approveReviewSuccess, setApproveReviewSuccess] = useState();

  const [restaurantFetch, { loading: restaurantLoading }] = useLazyQuery(RESTAURANT, {
    variables: {
      id: restaurantId,
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const { restaurant: newValue } = data;
      setRestaurant(newValue);
    },
  });

  const [createRestaurantMutation, { loading: createRestaurantLoading }] = useMutation(
    CREATE_RESTAURANT,
    {
      onCompleted: () => setCreateRestaurantSuccess(true),
      onError: setError,
    }
  );

  const [editRestaurantMutation, { loading: editRestaurantLoading }] = useMutation(
    EDIT_RESTAURANT,
    {
      onCompleted: () => setEditRestaurantSuccess(true),
      onError: setError,
    }
  );

  const [deleteRestaurant, { loading: deleteRestaurantLoading }] = useMutation(DELETE_RESTAURANT, {
    variables: {
      id: restaurantId,
    },
    onCompleted: () => setDeleteRestaurantSuccess(true),
    onError: setError,
  });

  const [createReviewMutation, { loading: createReviewLoading }] = useMutation(CREATE_REVIEW, {
    onError: setError,
    onCompleted: () => setCreateReviewSuccess(true),
  });

  const [approveReviewMutation, { loading: approveReviewLoading }] = useMutation(APPROVE_REVIEW, {
    onError: setError,
    onCompleted: () => setApproveReviewSuccess(true),
  });

  const [deleteReviewMutation, { loading: deleteReviewLoading }] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      setError(error);
    },
    onCompleted: (data) => {
      setDeleteReviewSuccess(true);
    },
  });

  const createRestaurant = ({ name, description }) => {
    createRestaurantMutation({
      variables: {
        input: { name, description },
      },
    });
  };

  const editRestaurant = ({ name, description }) => {
    editRestaurantMutation({
      variables: {
        input: { name, description, id: restaurantId },
      },
    });
  };

  const createReview = ({ rating, comment }) => {
    createReviewMutation({
      variables: {
        input: { restaurantId, rating, userComment: comment },
      },
    });
  };

  const approveReview = ({ id, approved, ownerComment }) => {
    approveReviewMutation({
      variables: {
        input: { id, approved, ownerComment },
      },
    });
  };

  const deleteReview = ({ id }) => {
    deleteReviewMutation({
      variables: {
        id,
      },
    });
  };

  useEffect(() => {
    if (!restaurantId) {
      setRestaurant(null);
    } else {
      restaurantFetch();
    }
  }, [restaurantId]);

  const values = useMemo(
    () => ({
      restaurantId,
      setRestaurantId,
      restaurant,
      restaurantLoading,
      restaurantFetch,
      createRestaurant,
      createRestaurantLoading,
      createRestaurantSuccess,
      setCreateRestaurantSuccess,
      editRestaurant,
      editRestaurantLoading,
      editRestaurantSuccess,
      setEditRestaurantSuccess,
      deleteRestaurant,
      deleteRestaurantLoading,
      deleteRestaurantSuccess,
      setDeleteRestaurantSuccess,
      createReview,
      createReviewLoading,
      createReviewSuccess,
      setCreateReviewSuccess,
      approveReview,
      approveReviewLoading,
      approveReviewSuccess,
      setApproveReviewSuccess,
      deleteReview,
      deleteReviewLoading,
      deleteReviewSuccess,
      setDeleteReviewSuccess,
      error,
      setError,
    }),
    [
      restaurantId,
      setRestaurantId,
      restaurant,
      restaurantLoading,
      restaurantFetch,
      createRestaurant,
      createRestaurantLoading,
      createRestaurantSuccess,
      setCreateRestaurantSuccess,
      editRestaurant,
      editRestaurantLoading,
      editRestaurantSuccess,
      setEditRestaurantSuccess,
      deleteRestaurant,
      deleteRestaurantLoading,
      deleteRestaurantSuccess,
      setDeleteRestaurantSuccess,
      createReview,
      createReviewLoading,
      createReviewSuccess,
      setCreateReviewSuccess,
      approveReview,
      approveReviewLoading,
      approveReviewSuccess,
      setApproveReviewSuccess,
      deleteReview,
      deleteReviewLoading,
      deleteReviewSuccess,
      setDeleteReviewSuccess,
      error,
      setError,
    ]
  );

  return <RestaurantContext.Provider value={values}>{children}</RestaurantContext.Provider>;
};

export const useRestaurantContext = () => {
  const context = React.useContext(RestaurantContext);

  if (context === undefined) {
    throw new Error('`DataHook` hook must be used within a `DataProvider` component');
  }
  return context;
};
