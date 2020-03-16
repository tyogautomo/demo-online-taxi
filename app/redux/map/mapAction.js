import { API_KEY } from 'react-native-dotenv';
import axios from 'axios';

import {
  REQUEST_POINT_ADDRESS,
  REQUEST_POINT_ADDRESS_SUCCESS,
  REQUEST_POINT_ADDRESS_FAILED,
  REQUEST_DESTINATION_POINT,
  REQUEST_DESTINATION_POINT_SUCCESS,
  REQUEST_DESTINATION_POINT_FAILED
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
    });
    dispatch({
      type: REQUEST_POINT_ADDRESS_SUCCESS,
      payload: data.results[0]
    })
  } catch (error) {
    dispatch({ type: REQUEST_POINT_ADDRESS_FAILED, error: error.response });
  }
};

const requestDestinationPoint = ({ latitude, longitude }) => async dispatch => {
  try {
    dispatch({ type: REQUEST_DESTINATION_POINT });
    const { data } = await axios({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    });
    console.log(data, 'DATA BITCHH <<<<<<<<')
    dispatch({
      type: REQUEST_DESTINATION_POINT_SUCCESS,
      payload: data.results[0]
    })
  } catch (error) {
    dispatch({ type: REQUEST_DESTINATION_POINT_FAILED });
  }
};

export {
  requestRoute,
  requestPointAddress,
  requestDestinationPoint
};
