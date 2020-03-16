import { StyleSheet } from 'react-native';

import { constant } from '../../utils/constant';
import { colors } from '../../themes/colors';

const { DEVICE_HEIGHT } = constant;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: DEVICE_HEIGHT - 75
  },
  summaryContainer: {
    position: 'absolute',
    width: '90%',
    height: 140,
    backgroundColor: colors.white,
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    padding: 20,
    top: 20
  },
  textNow: bookNow => ({
    borderWidth: bookNow ? 1 : 0,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: colors.greenHaze,
    borderRadius: 3,
    fontFamily: 'OsnovaPro',
    fontSize: 13,
    color: bookNow ? colors.greenHaze : 'black'
  }),
  textLater: bookNow => ({
    borderWidth: !bookNow ? 1 : 0,
    borderColor: colors.greenHaze,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontFamily: 'OsnovaPro',
    fontSize: 13,
    color: !bookNow ? colors.greenHaze : 'black'
  }),
  originPinContainer: {
    position: 'absolute',
    width: '100%',
    height: DEVICE_HEIGHT - 75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  directionTextContainer: {
    justifyContent: 'space-between',
    height: 90,
    paddingVertical: 3,
    paddingLeft: 20,
    flex: 1
  },
  directionIconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90
  },
  timeContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  separatorDirection: {
    borderBottomWidth: 1,
    width: '100%', height: 1,
    backgroundColor: colors.silver,
    borderColor: colors.silver
  }
});

export { styles };
