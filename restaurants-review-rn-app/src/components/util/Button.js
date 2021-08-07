import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../../styles/Colors';
import { Icon } from 'react-native-elements';

const Button = ({ disabled, loading, text, iconName, onPress, color = Colors.primary }) => {
  const content = () => {
    if (loading) {
      return <ActivityIndicator color={Colors.lightFont} />;
    }
    return (
      <View style={styles.contentContainer}>
        {iconName && <Icon name={iconName} color={Colors.lightFont} />}
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={
        disabled
          ? { ...styles.container, ...styles.disabledContainer, backgroundColor: color }
          : { ...styles.container, backgroundColor: color }
      }
      onPress={onPress}
      disabled={disabled}
    >
      {content()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: Colors.lightFont,
    fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 15,
  },
});

export default Button;
