import { API_KEY } from 'react-native-dotenv';
import axios from 'axios';
import polyline from '@mapbox/polyline';

import {
  REQUEST_POINT_ADDRESS,
  REQUEST_POINT_ADDRESS_SUCCESS,
  REQUEST_POINT_ADDRESS_FAILED,
  REQUEST_DESTINATION_POINT,
  REQUEST_DESTINATION_POINT_SUCCESS,
  REQUEST_DESTINATION_POINT_FAILED,
  REQUEST_DIRECTION_ROUTE,
  REQUEST_DIRECTION_ROUTE_SUCCESS,
  REQUEST_DIRECTION_ROUTE_FAILED
} from '../constant';

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
    dispatch({
      type: REQUEST_DESTINATION_POINT_SUCCESS,
      payload: data.results[0]
    })
  } catch (error) {
    dispatch({ type: REQUEST_DESTINATION_POINT_FAILED });
  }
};

const requestDirectionRoute = ({ origin, destination }) => dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: REQUEST_DIRECTION_ROUTE });
      const { data } = await axios({
        url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
      });
      const decode = polyline.decode(data.routes[0].overview_polyline.points);
      const formatted = decode.map(coord => ({
        latitude: coord[0],
        longitude: coord[1]
      }));
      dispatch({
        type: REQUEST_DIRECTION_ROUTE_SUCCESS,
        payload: formatted
      })
      resolve(formatted)
    } catch (error) {
      dispatch({ type: REQUEST_DIRECTION_ROUTE_FAILED })
      reject(error)
    }
  })
}

export {
  requestDirectionRoute,
  requestPointAddress,
  requestDestinationPoint
};
