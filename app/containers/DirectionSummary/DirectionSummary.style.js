import { StyleSheet } from 'react-native';

import { constant } from '../../utils/constant';
import { colors } from '../../themes/colors';

const { DEVICE_HEIGHT } = constant;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: DEVICE_HEIGHT * 0.45
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
    borderColor:  type === rideName ? colors.greenHaze : 'transparent',
    backgroundColor: type === rideName ? colors.hintGreen : 'transparent'
  })
});

export { styles };
