import React from 'react';
import * as R from 'ramda';
import CustomerRestaurantDetail from './CustomerRestaurantDetail';
import OwnerRestaurantDetail from './OwnerRestaurantDetail';
import AdminRestaurantDetail from './AdminRestaurantDetail';

const RestaurantDetail = ({ role, ...props }) => {
  switch (role) {
    case 'CUSTOMER':
      return <CustomerRestaurantDetail {...props} />;
    case 'OWNER':
      return <OwnerRestaurantDetail {...props} />;
    case 'ADMIN':
      return <AdminRestaurantDetail {...props} />;
    default:
      return null;
  }
};

export default RestaurantDetail;
