import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { ApolloProvider } from '@apollo/client';

import navigator from './src/navigator';
import client from './src/graphql/client';
import { setNavigator } from './src/util/navigationRef';
import { RestaurantsProvider } from './src/context/RestaurantsContext';
import { RestaurantProvider } from './src/context/RestaurantContext';
import { AuthProvider } from './src/context/AuthContext';
import { UsersProvider } from './src/context/UsersContext';

export default function App() {
  const AppComponent = createAppContainer(navigator);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RestaurantsProvider>
          <RestaurantProvider>
            <UsersProvider>
              <AppComponent
                ref={(navRef) => {
                  setNavigator(navRef);
                }}
              />
            </UsersProvider>
          </RestaurantProvider>
        </RestaurantsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
