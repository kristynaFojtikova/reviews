import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { withNavigation } from 'react-navigation';
import * as R from 'ramda';
import RESTAURANTS from '../graphql/queries/RESTAURANTS';
import CenteringView from '../components/util/CenteringView';
import Colors from '../styles/Colors';
import RestaurantCell from '../components/RestaurantCell';
import FloatingButton from '../components/util/FloatingButton';
import useAuthContext from '../context/useAuthContext';
import StarsRow from '../components/StarsRow';
import getAverageRatingFor from '../util/getAverageRatingFor';

const RestaurantListScreen = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(RESTAURANTS);

  const { state } = useAuthContext();
  const role = R.path(['user', 'role'], state);
  const isOwner = role === 'OWNER';

  const restaurants = data ? data.restaurants : null;

  const [starFilter, setStarFilter] = useState(0);

  const filteredRestaurants = restaurants
    ? restaurants.filter((restaurant) => {
        const averageRating = getAverageRatingFor(restaurant.reviews);
        console.log('Average rating', averageRating);
        console.log('Star filter', starFilter);
        return averageRating && averageRating >= starFilter;
      })
    : null;

  const renderItem = ({ item }) => {
    const onPress = () =>
      navigation.navigate('RestaurantDetail', { id: item.id, callback: refetch });
    return <RestaurantCell item={item} onPress={onPress} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.title}>{'Restaurants'}</Text>
        {isOwner && (
          <FloatingButton
            iconName="add-circle-outline"
            tintColor={Colors.darkFont}
            onPress={() => navigation.navigate('RestaurantForm', { callback: refetch })}
          />
        )}
      </View>

      {restaurants && (
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={styles.contentContainer}>
                <Text style={styles.label}>{'Filter by rating'}</Text>
                <StarsRow rating={starFilter} setRating={setStarFilter} />
              </View>
            );
          }}
          loading={loading}
          data={filteredRestaurants}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          onRefresh={refetch}
          refreshing={loading}
        />
      )}
      {loading && !restaurants && (
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
  },
  contentContainer: {
    margin: 15,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
  },
  label: {
    color: Colors.darkFont,
    fontSize: 14,
    marginVertical: 5,
  },
  list: {},
});

export default withNavigation(RestaurantListScreen);
