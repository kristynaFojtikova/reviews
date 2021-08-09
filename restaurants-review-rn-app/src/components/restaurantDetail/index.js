import React from 'react';
import CustomerRestaurantDetail from './CustomerRestaurantDetail';
import OwnerRestaurantDetail from './OwnerRestaurantDetail';
import AdminRestaurantDetail from './AdminRestaurantDetail';
import { useAuthContext } from '../../context/AuthContext';
import userDetailsHandle from '../../util/userDetailsHandle';

const RestaurantDetail = (props) => {
  const { user } = useAuthContext();
  const { role } = userDetailsHandle(user);
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
