import { StyleSheet } from 'react-native';

import { constant } from '../../utils/constant';

const { DEVICE_HEIGHT } = constant;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: DEVICE_HEIGHT - 70
  }
});

export { styles };
