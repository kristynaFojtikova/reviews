import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AccountScreen from '../screens/AccountScreen';
import RestaurantFormScreen from '../screens/RestaurantFormScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import SignInScreen from '../screens/SignInScreen';
import UsersListScreen from '../screens/UsersListScreen';
import UserFormScreen from '../screens/UserFormScreen';
import LandingScreen from '../screens/LandingScreen';
import createCofiguredBottomTabBar from './bottomTabBarConfig';

const restaurantStackNavigator = createStackNavigator({
  RestaurantList: RestaurantListScreen,
  RestaurantDetail: RestaurantDetailScreen,
  RestaurantForm: RestaurantFormScreen,
});

const userStackNavigator = createStackNavigator({
  UserList: UsersListScreen,
  UserForm: UserFormScreen,
});

const navigator = createSwitchNavigator({
  landingScreen: LandingScreen,
  authFlow: createStackNavigator({
    Signin: SignInScreen,
    Register: RegisterScreen,
  }),
  customerFlow: createCofiguredBottomTabBar({
    Restaurants: restaurantStackNavigator,
    Account: AccountScreen,
  }),
  adminFlow: createCofiguredBottomTabBar({
    Restaurants: restaurantStackNavigator,
    Users: userStackNavigator,
    Account: AccountScreen,
  }),
  ownerFlow: createCofiguredBottomTabBar({
    Restaurants: restaurantStackNavigator,
    Account: AccountScreen,
  }),
});

export default navigator;
