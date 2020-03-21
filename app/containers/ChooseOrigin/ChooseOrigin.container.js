import { connect } from 'react-redux';

import { ChooseOrigin } from './ChooseOrigin.screen';
import { requestPointAddress } from '../../redux/map/mapAction';

const mapStateToProps = state => ({
  originPoint: state.mapReducer.originPoint,
  isRequestLocation: state.mapReducer.isRequestLocation
});
const mapDispatchToProps = dispatch => ({
  requestPointAddress: data => dispatch(requestPointAddress(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseOrigin);
