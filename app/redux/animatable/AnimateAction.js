import { CHANGE_BOTTOM_OFFSET } from '../constant';

const changeBottomOffset = value => dispatch => {
  dispatch({
    type: CHANGE_BOTTOM_OFFSET
  })
}

export {
  changeBottomOffset
}