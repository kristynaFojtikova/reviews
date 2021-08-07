import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import { navigate } from '../util/navigationRef';
import { clearApolloStore } from '../graphql/client';

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
    case 'updateUser':
      return { ...state, user: action.payload };
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

const updateUser = (dispatch) => (user) => {
  const { role } = user;
  console.log('NAVIGATE', role);
  switch (role) {
    case 'CUSTOMER':
      navigate('customerFlow');
    case 'OWNER':
      navigate('ownerFlow');
    case 'ADMIN':
      navigate('adminFlow');
    default:
  }
  dispatch({ type: 'updateUser', payload: user });
};

const signin =
  (dispatch) =>
  async ({ accessToken, refreshToken, user }) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    const { role } = user;
    console.log('NAVIGATE', role);
    switch (role) {
      case 'CUSTOMER':
        navigate('customerFlow');
      case 'OWNER':
        navigate('ownerFlow');
      case 'ADMIN':
        navigate('adminFlow');
      default:
    }
    dispatch({ type: 'signin', payload: { accessToken, refreshToken, user } });
  };

export const { Provider: AuthProvider, Context: AuthContext } = createDataContext(
  authReducer,
  { signout, signin, updateUser },
  { accessToken: null, refreshToken: null, user: null }
);
