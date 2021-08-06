import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { withNavigation } from 'react-navigation';
import RestaurantList from '../components/RestaurantList';
import RESTAURANTS from '../graphql/queries/restaurants';
import CenteringView from '../components/util/CenteringView';
import Colors from '../styles/Colors';

const RestaurantListScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(RESTAURANTS);

  useEffect(() => {
    if (data) {
      console.log('DATA', data);
    }
    if (error) {
      console.log('error', { ...error });
      const { graphQLErrors } = error;
      console.log('graphQLErrors', graphQLErrors);
    }
  }, [data, error, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{'Restaurants'}</Text>
      <RestaurantList restaurants={[]} />
      {loading && (
        <CenteringView>
          <ActivityIndicator color={Colors.primary} />
        </CenteringView>
      )}
    </SafeAreaView>
  );
};

RestaurantListScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
  },
});

export default withNavigation(RestaurantListScreen);
