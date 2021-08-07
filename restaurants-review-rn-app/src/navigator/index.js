import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from '../screens/AccountScreen';
import RestaurantFormScreen from '../screens/RestaurantFormScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import SignInScreen from '../screens/SignInScreen';
import UsersListScreen from '../screens/UsersListScreen';
import UserFormScreen from '../screens/UserFormScreen';

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
  landingScreen: ResolveAuthScreen,
  authFlow: createStackNavigator({
    Signin: SignInScreen,
    Register: RegisterScreen,
  }),
  customerFlow: createBottomTabNavigator({
    Restaurants: restaurantStackNavigator,
    Account: AccountScreen,
  }),
  adminFlow: createBottomTabNavigator({
    Restaurants: restaurantStackNavigator,
    Users: userStackNavigator,
    Account: AccountScreen,
  }),
  ownerFlow: createBottomTabNavigator({
    Restaurants: restaurantStackNavigator,
    Account: AccountScreen,
  }),
});

export default navigator;
