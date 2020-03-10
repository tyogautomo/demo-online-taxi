import { Animated } from 'react-native';

import { CHANGE_BOTTOM_OFFSET } from '../constant';

const initialState = {
  bottom: new Animated.Value(0)
}

const animatedReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BOTTOM_OFFSET:
      return { ...state };
    default:
      return { ...state };
  }
}

export { animatedReducer };
