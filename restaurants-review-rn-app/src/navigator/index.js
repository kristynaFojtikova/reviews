import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RegisterScreen from '../screens/RegisterScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import SignInScreen from '../screens/SignInScreen';

const navigator = createSwitchNavigator({
  authFlow: createStackNavigator({
    Register: RegisterScreen,
    Signin: SignInScreen,
  }),
  customerFlow: createBottomTabNavigator({
    RestaurantsList: RestaurantListScreen,
    //   RestaurantDetail: RestaurantDetailScreen,
    //   Account: AccountScreen,
  }),
  adminFlow: createBottomTabNavigator({
    RestaurantsList: RestaurantListScreen,
    //   RestaurantDetail: RestaurantDetailScreen,
    //   UsersList: UserListScreen,
    //   Account: AccountScreen,
  }),
  ownerFlow: createBottomTabNavigator({
    RestaurantsList: RestaurantListScreen,
    //   RestaurantDetail: RestaurantDetailScreen,
    //   Account: AccountScreen,
  }),
});

export default navigator;
