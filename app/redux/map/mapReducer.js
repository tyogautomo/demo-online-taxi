import {
  REQUEST_LOCATION,
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

const initialState = {
  originPoint: {
    formatted_address: '',
    geometry: {
      location: {
        lat: 0,
        lng: 0
      }
    },
    place_id: ''
  },
  destinationPoint: {
    formatted_address: '',
    geometry: {
      location: {
        lat: 0,
        lng: 0
      }
    },
    place_id: ''
  },
  directionRoutes: [],
  isRequestLocation: false,
  isRequestDestinationPoint: false,
  isRequestDirectionRoutes: false
}

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOCATION:
      return {
        ...state
      };
    case REQUEST_POINT_ADDRESS:
      return {
        ...state,
        isRequestLocation: true,
        originPoint: {
          ...initialState.originPoint,
          formatted_address: ''
        }
      };
    case REQUEST_POINT_ADDRESS_SUCCESS:
      return {
        ...state,
        isRequestLocation: false,
        originPoint: action.payload
      };
    case REQUEST_POINT_ADDRESS_FAILED:
      return {
        ...state,
        isRequestLocation: false
      };
    case REQUEST_DESTINATION_POINT:
      return {
        ...state,
        isRequestDestinationPoint: true,
        destinationPoint: {
          ...initialState.destinationPoint,
          formatted_address: ''
        }
      };
    case REQUEST_DESTINATION_POINT_SUCCESS:
      return {
        ...state,
        isRequestDestinationPoint: false,
        destinationPoint: action.payload
      };
    case REQUEST_DESTINATION_POINT_FAILED:
      return {
        ...state,
        isRequestDestinationPoint: false
      }
    case REQUEST_DIRECTION_ROUTE:
      return {
        ...state,
        directionRoutes: [],
        isRequestDirectionRoutes: true
      }
    case REQUEST_DIRECTION_ROUTE_SUCCESS:
      return {
        ...state,
        directionRoutes: action.payload,
        isRequestDirectionRoutes: false
      }
    case REQUEST_DIRECTION_ROUTE_FAILED:
      return {
        ...state,
        isRequestDirectionRoutes: false
      }
    default:
      return { ...state }
  }
};

export { mapReducer };
