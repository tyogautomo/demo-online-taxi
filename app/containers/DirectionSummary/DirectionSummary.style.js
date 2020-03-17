import { StyleSheet } from 'react-native';

import { constant } from '../../utils/constant';
import { colors } from '../../themes/colors';

const { DEVICE_HEIGHT, DEVICE_WIDTH } = constant;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: DEVICE_HEIGHT * 0.55
  },
  summarySheetContainer: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: DEVICE_HEIGHT * 0.45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 8,
    padding: 20
  },
  rideItem: (type, rideName) => ({
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 8,
    borderColor: type === rideName ? colors.greenHaze : 'transparent',
    backgroundColor: type === rideName ? colors.hintGreen : 'transparent'
  }),
  financeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 4,
    borderRightWidth: 1,
    borderColor: colors.silver
  },
  payType: {
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderColor: colors.greenHaze,
    marginRight: 8
  },
  balanceTitle: {
    fontSize: 12,
    fontFamily: 'OsnovaPro',
    color: colors.silver
  },
  balance: {
    fontFamily: 'OsnovaProBold',
    fontSize: 13
  },
  promoContainer: {
    flex: 2,
    borderRightWidth: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.silver
  },
  financeMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookButton: {
    backgroundColor: colors.greenHaze,
    paddingHorizontal: 10,
    paddingVertical: 11,
    fontFamily: 'OsnovaProBold',
    color: colors.white,
    borderRadius: 5,
    width: DEVICE_WIDTH / 2.3,
    textAlign: 'center',
    fontSize: 18
  },
  rightNowButton: {
    backgroundColor: colors.danube,
    paddingHorizontal: 10,
    paddingVertical: 11,
    fontFamily: 'OsnovaProBold',
    color: colors.white,
    borderRadius: 5,
    width: DEVICE_WIDTH / 2.3,
    textAlign: 'center',
    fontSize: 18
  }
});

export { styles };
