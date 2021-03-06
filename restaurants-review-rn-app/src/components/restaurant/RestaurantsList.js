import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import StarsRow from '../util/StarsRow';
import CommonStyles from '../../styles/CommonStyles';
import Colors from '../../styles/Colors';
import RestaurantCell from './RestaurantCell';

const RestaurantsList = React.memo(
  ({ starFilter, setStarFilter, loading, restaurants, onRefresh, onSelectItem }) => {
    const renderItem = ({ item }) => (
      <RestaurantCell item={item} onPress={() => onSelectItem(item.id)} />
    );

    return (
      <FlatList
        ListHeaderComponent={() => (
          <View style={CommonStyles.contentContainer}>
            <Text style={styles.label}>FILTER BY RATING:</Text>
            <StarsRow rating={starFilter} setRating={setStarFilter} />
          </View>
        )}
        loading={loading}
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={CommonStyles.container}
        onRefresh={onRefresh}
        refreshing={loading}
      />
    );
  },
  (oldProps, newProps) => {
    const starFilterSame = oldProps.starFilter === newProps.starFilter;
    const loadingSame = oldProps.loading === newProps.loading;
    const restaurantsSame = oldProps.restaurants === newProps.restaurants;
    return starFilterSame && loadingSame && restaurantsSame;
  }
);

const styles = StyleSheet.create({
  label: {
    color: Colors.darkFont,
    fontSize: 14,
    marginVertical: 5,
  },
});

export default RestaurantsList;
