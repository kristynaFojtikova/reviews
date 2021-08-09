import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Colors from '../styles/Colors';
import FloatingButton from '../components/util/FloatingButton';
import { useRestaurantsContext } from '../context/RestaurantsContext';
import { useRestaurantContext } from '../context/RestaurantContext';
import RestaurantsList from '../components/RestaurantsList';
import CommonStyles from '../styles/CommonStyles';
import { useAuthContext } from '../context/AuthContext';
import userDetailsHandle from '../util/userDetailsHandle';

const RestaurantListScreen = ({ navigation }) => {
  const {
    restaurants,
    restaurantsError: error,
    restaurantsFetch: fetch,
    restaurantsLoading: loading,
    starFilter,
    setStarFilter,
  } = useRestaurantsContext();

  const { setRestaurantId } = useRestaurantContext();

  useEffect(() => {
    fetch();
  }, []);

  const { user } = useAuthContext();
  const { isOwner } = userDetailsHandle(user);

  const onPress = (id) => {
    setRestaurantId(id);
    navigation.navigate('RestaurantDetail');
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.title}>Restaurants</Text>
        {isOwner && (
          <FloatingButton
            iconName="add-circle-outline"
            tintColor={Colors.darkFont}
            onPress={() => {
              setRestaurantId();
              navigation.navigate('RestaurantForm');
            }}
          />
        )}
      </View>
      <RestaurantsList
        starFilter={starFilter}
        setStarFilter={setStarFilter}
        loading={loading}
        restaurants={restaurants}
        onRefresh={fetch}
        onSelectItem={onPress}
      />
    </SafeAreaView>
  );
};

RestaurantListScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
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
});

export default withNavigation(RestaurantListScreen);
