import { API_KEY } from 'react-native-dotenv';
import axios from 'axios';

import {
  REQUEST_POINT_ADDRESS,
  REQUEST_POINT_ADDRESS_SUCCESS,
  REQUEST_POINT_ADDRESS_FAILED
} from '../constant';

import { REQUEST_LOCATION } from '../constant';

const requestRoute = () => dispatch => {
  dispatch({ type: REQUEST_LOCATION })
}

const requestPointAddress = ({ latitude, longitude }) => async dispatch => {
  try {
    dispatch({ type: REQUEST_POINT_ADDRESS });
    const { data } = await axios({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    })
    dispatch({
      type: REQUEST_POINT_ADDRESS_SUCCESS,
      payload: data.results[0]
    })
  } catch (error) {
    dispatch({ type: REQUEST_POINT_ADDRESS_FAILED, error: error.response });
  }
}

export {
  requestRoute,
  requestPointAddress
};
