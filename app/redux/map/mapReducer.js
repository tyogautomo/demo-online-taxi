import { REQUEST_LOCATION } from '../constant';

const initialState = {

}

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOCATION:
      return {
        ...state
      }
    default:
      return { ...state }
  }
};

export { mapReducer };
