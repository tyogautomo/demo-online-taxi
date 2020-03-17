import { StyleSheet } from 'react-native';

import { constant } from '../../utils/constant';
import { colors } from '../../themes/colors';

const { DEVICE_HEIGHT } = constant;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: DEVICE_HEIGHT - 75
  }
});

export { styles };
