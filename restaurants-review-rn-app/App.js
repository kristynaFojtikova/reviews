import React from 'react';
import { createAppContainer } from 'react-navigation';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import navigator from './src/navigator';
import client from './src/graphql/client';
import { setNavigator } from './src/util/navigationRef';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  const App = createAppContainer(navigator);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </ApolloProvider>
  );
}
