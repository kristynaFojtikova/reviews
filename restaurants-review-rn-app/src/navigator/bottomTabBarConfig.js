import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Colors from '../styles/Colors';

const tabBarIcon = ({ tintColor, navigation }) => {
  const { routeName } = navigation.state;
  // const MaterialIcons = MaterialIcons;
  let iconName;
  if (routeName === 'Restaurants') {
    iconName = 'restaurant-menu';
  } else if (routeName === 'Users') {
    iconName = 'people';
  } else if (routeName === 'Account') {
    iconName = 'person';
  }
  return <MaterialIcon name={iconName} size={20} color={tintColor} />;
};

export const bottomTabBarConfig = {
  tabBarOptions: {
    activeTintColor: Colors.darkFont,
    inactiveTintColor: Colors.grey,
    style: {
      borderTopWidth: 0,
      height: null,
      backgroundColor: Colors.offWhite,
    },
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: (props) => tabBarIcon({ ...props, navigation }),
    header: false,
  }),
};

const createCofiguredBottomTabBar = (routes) =>
  createBottomTabNavigator(
    {
      ...routes,
    },
    {
      ...bottomTabBarConfig,
    }
  );

export default createCofiguredBottomTabBar;
