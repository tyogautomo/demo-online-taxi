import { StyleSheet } from 'react-native';

import { colors } from '../../themes/colors';
import { constant } from '../../utils/constant';

const { DEVICE_WIDTH } = constant

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.greenHaze,
    height: 60,
    width: '100%',
    flexDirection: 'row'
  },
  leftHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  leftHeaderText: {
    color: colors.white,
    fontFamily: 'OsnovaPro',
    marginTop: 5,
    fontSize: 12,
    marginLeft: 2
  },
  midHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  midHeaderText: {
    color: colors.white,
    fontFamily: 'Lobster-Regular',
    fontSize: 35
  },
  rightHeaderContainer: {
    flex: 1
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    alignContent: 'space-between',
    height: (DEVICE_WIDTH / 6) * 3
  },
  menuItem: {
    width: DEVICE_WIDTH / 6,
    height: DEVICE_WIDTH / 6,
    backgroundColor: colors.greenHaze,
    borderRadius: (DEVICE_WIDTH / 6) / 2,
    marginHorizontal: DEVICE_WIDTH * 0.01
  }
});

export { styles };
