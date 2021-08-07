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
import { useQuery, useMutation } from '@apollo/client';
import { withNavigation } from 'react-navigation';
import * as R from 'ramda';

import CenteringView from '../components/util/CenteringView';
import Colors from '../styles/Colors';
import USERS from '../graphql/queries/USERS';
import FloatingButton from '../components/util/FloatingButton';
import DELETE_USER from '../graphql/mutations/DELETE_USER';

const UsersListScreen = ({ navigation }) => {
  // MARK: - Mutations & Queries
  const [deleteUser, { data: deleteUserData, _, error: deleteUserError }] =
    useMutation(DELETE_USER);
  const { loading, error, data, refetch } = useQuery(USERS);
  useEffect(() => {
    if (deleteUserData) {
      refetch();
      Alert.alert('Success!', 'User has been deleted!');
    }
  }, [deleteUserData]);

  const users = data ? data.users : null;

  // MARK: - Actions
  const deleteUserAction = (id) => {
    deleteUser({
      variables: {
        id: item.id,
      },
    });
  };

  // MARK: - Render
  const renderItem = ({ item }) => {
    const { id } = item;
    return (
      <View style={styles.row}>
        <Text style={styles.subtitle}>{item.email}</Text>
        <Text style={styles.text}>{item.role}</Text>
        <FloatingButton
          iconName="delete"
          tintColor={Colors.darkFont}
          onPress={() => deleteUserAction(id)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.title}>{'Users'}</Text>
        <FloatingButton
          iconName="add-circle-outline"
          tintColor={Colors.darkFont}
          onPress={() => navigation.navigate('UserForm', { callback: refetch })}
        />
      </View>
      {users && (
        <FlatList
          loading={loading}
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          onRefresh={refetch}
          refreshing={loading}
        />
      )}
      {loading && !users && (
        <CenteringView>
          <ActivityIndicator color={Colors.primary} />
        </CenteringView>
      )}
    </SafeAreaView>
  );
};

UsersListScreen.navigationOptions = {
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
  subtitle: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  text: {
    marginVertical: 5,
    fontSize: 10,
    fontWeight: '400',
    flex: 1,
    color: Colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  list: {
    margin: 15,
  },
});

export default withNavigation(UsersListScreen);
