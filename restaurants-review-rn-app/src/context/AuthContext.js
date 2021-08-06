import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import { navigate } from '../util/navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    case 'signout':
      return { accessToken: null, refreshToken: null, user: null };
    default:
      return state;
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  dispatch({ type: 'signout' });
  navigate('authFlow');
};

const tryLocalSignin = (dispatch) => async () => {
  //
};

const signin =
  (dispatch) =>
  async ({ accessToken, refreshToken, user }) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    const { role } = user;
    switch (role) {
      case 'CUSTOMER':
        navigate('customerFlow');
      case 'OWNER':
        navigate('ownerFlow');
      case 'ADMIN':
        navigate('adminFlow');
      default:
    }
    return { type: 'signin', payload: { accessToken, refreshToken, user } };
  };

export const { Provider: AuthProvider, Context: AuthContext } = createDataContext(
  authReducer,
  { signout, signin, tryLocalSignin },
  { accessToken: null, refreshToken: null, user: null }
);
