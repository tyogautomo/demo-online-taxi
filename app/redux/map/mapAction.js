import { REQUEST_LOCATION } from '../constant';

const requestRoute = () => dispatch => {
  dispatch({ type: REQUEST_LOCATION })
}

export {
  requestRoute
};
