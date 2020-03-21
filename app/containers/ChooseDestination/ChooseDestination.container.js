import { connect } from 'react-redux';

import { ChooseDestination } from './ChooseDestination.screen'
import { requestDestinationPoint, requestDirectionRoute } from '../../redux/map/mapAction';

const mapStateToProps = state => ({
  originPoint: state.mapReducer.originPoint,
  destinationPoint: state.mapReducer.destinationPoint,
  isRequestDestinationPoint: state.mapReducer.isRequestDestinationPoint,
  isRequestDirectionRoutes: state.mapReducer.isRequestDirectionRoutes
});
const mapDispatchToProps = dispatch => ({
  requestDestinationPoint: point => dispatch(requestDestinationPoint(point)),
  requestDirectionRoute: (direction) => dispatch(requestDirectionRoute(direction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseDestination)