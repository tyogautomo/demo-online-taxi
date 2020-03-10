import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const constant = {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height
}

export { constant };
