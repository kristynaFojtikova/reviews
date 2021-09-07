import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloConsumer } from '@apollo/client';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `http://${Platform.OS === 'android' ? '192.168.43.7' : 'localhost'}:4000/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const clearApolloStore = () => (
  <ApolloConsumer>
    {(client) => {
      client.clearStore();
    }}
  </ApolloConsumer>
);

export const resetApolloStore = () => (
  <ApolloConsumer>
    {(client) => {
      client.resetStore();
    }}
  </ApolloConsumer>
);

export default client;
