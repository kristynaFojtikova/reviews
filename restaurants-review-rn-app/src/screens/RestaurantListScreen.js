import React, { useContext, useEffect } from 'react';
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

const RestaurantListScreen = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(RESTAURANTS);

  const { state } = useAuthContext();
  const role = R.path(['user', 'role'], state);
  const isOwner = role === 'OWNER';
  const isAdmin = role === 'ADMIN';

  const restaurants = data ? data.restaurants : null;

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
          loading={loading}
          data={restaurants}
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
  list: {},
});

export default withNavigation(RestaurantListScreen);
