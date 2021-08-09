import { StyleSheet } from 'react-native';
import Colors from './Colors';

const CommonStyles = StyleSheet.create({
  subtitle: {
    margin: 15,
    color: Colors.darkFont,
    fontSize: 24,
    fontWeight: '600',
  },
  contentContainer: {
    margin: 15,
  },
  container: {
    flex: 1,
  },
});

export default CommonStyles;
