import { StyleSheet } from 'react-native';

import { constant } from '../../utils/constant';

const { DEVICE_WIDTH } = constant;

const styles = StyleSheet.create({
  backgroundContainer: {
    width: DEVICE_WIDTH,
    height: 150,
    position: 'absolute'
  }
});

export { styles };
