import React, { useState, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import RESTAURANTS from '../graphql/queries/RESTAURANTS';
import getAverageRatingFor from '../util/getAverageRatingFor';

export const RestaurantsContext = React.createContext();

export const RestaurantsProvider = ({ children }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [starFilter, setStarFilter] = useState(null);

  const restaurants = React.useMemo(() => {
    const ratedRestaurants = allRestaurants.map((item) => ({
      ...item,
      averageRating: getAverageRatingFor(item),
    }));

    const starFiltered = starFilter
      ? ratedRestaurants.filter((item) => item.averageRating && item.averageRating >= starFilter)
      : ratedRestaurants;

    const sorted = starFiltered.sort((a, b) => {
      if (a.averageRating < b.averageRating) {
        return 1;
      }
      if (a.averageRating > b.averageRating) {
        return -1;
      }
      return 0;
    });

    return sorted;
  }, [allRestaurants, starFilter]);

  const [error, setError] = useState(null);

  const [restaurantsFetch, { loading: restaurantsLoading }] = useLazyQuery(RESTAURANTS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const { restaurants: newValue } = data;
      setAllRestaurants(newValue);
    },
    onError: setError,
  });

  const values = useMemo(
    () => ({
      restaurants,
      restaurantsLoading,
      restaurantsFetch,
      error,
      starFilter,
      setStarFilter,
    }),
    [restaurants, restaurantsLoading, restaurantsFetch, error, starFilter, setStarFilter]
  );

  return <RestaurantsContext.Provider value={values}>{children}</RestaurantsContext.Provider>;
};

export const useRestaurantsContext = () => {
  const context = React.useContext(RestaurantsContext);

  if (context === undefined) {
    throw new Error('`DataHook` hook must be used within a `DataProvider` component');
  }
  return context;
};
