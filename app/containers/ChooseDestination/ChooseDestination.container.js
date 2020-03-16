import { connect } from 'react-redux';

import { ChooseDestination } from './ChooseDestination.screen'
import { requestDestinationPoint } from '../../redux/map/mapAction';

const mapStateToProps = state => ({
  originPoint: state.mapReducer.originPoint,
  destinationPoint: state.mapReducer.destinationPoint
});
const mapDispatchToProps = dispatch => ({
  requestDestinationPoint: point => dispatch(requestDestinationPoint(point))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseDestination)