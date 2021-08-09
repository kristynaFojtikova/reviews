import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert, Text, FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Colors from '../styles/Colors';
import FloatingButton from '../components/util/FloatingButton';
import { useUsersContext } from '../context/UsersContext';
import CommonStyles from '../styles/CommonStyles';

const UsersListScreen = ({ navigation }) => {
  const {
    users,
    usersFetch,
    deleteUser,
    deleteUserSuccess,
    setDeleteUserSuccess,
    error,
    setError,
    usersLoading,
  } = useUsersContext();

  useEffect(() => {
    usersFetch();
  }, []);

  useEffect(() => {
    if (deleteUserSuccess) {
      usersFetch();
      Alert.alert('Success!', 'User has been deleted!');
      setDeleteUserSuccess();
    }
  }, [deleteUserSuccess]);

  useEffect(() => {
    if (error) {
      const message =
        error.message || 'There was a problem with your request, please try again later';
      Alert.alert('Ooops!', message);
      setError();
    }
  }, [error]);

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
          onPress={() =>
            deleteUser({
              id,
            })
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.title}>Users</Text>
        <FloatingButton
          iconName="add-circle-outline"
          tintColor={Colors.darkFont}
          onPress={() => navigation.navigate('UserForm')}
        />
      </View>
      {users && (
        <FlatList
          loading={usersLoading}
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={CommonStyles.contentContainer}
          onRefresh={usersFetch}
          refreshing={usersLoading}
        />
      )}
    </SafeAreaView>
  );
};

UsersListScreen.navigationOptions = {
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
});

export default withNavigation(UsersListScreen);
