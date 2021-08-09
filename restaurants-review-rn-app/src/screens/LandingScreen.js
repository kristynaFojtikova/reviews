import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const { userFetch } = useAuthContext();

  useEffect(() => {
    userFetch();
  }, []);

  return null;
};

export default ResolveAuthScreen;
