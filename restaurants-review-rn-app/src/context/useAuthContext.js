import React from 'react';

import { AuthContext } from './AuthContext';

export default () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('`DataHook` hook must be used within a `DataProvider` component');
  }
  return context;
};
