import { StyleSheet } from 'react-native';

import { colors } from '../../themes/colors';

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 8,
    height: 60,
    flexDirection: 'row'
  },
  tabMenuContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rideIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.salem,
    borderRadius: 40,
    elevation: 2,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { styles };
