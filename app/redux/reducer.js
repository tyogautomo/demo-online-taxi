import { combineReducers } from 'redux';

import { mapReducer } from './map/mapReducer';
import { animatedReducer } from './animatable/AnimateReducer';

export default combineReducers({
  mapReducer,
  animatedReducer
})