import { connect } from 'react-redux';

import { DirectionSummary } from './DirectionSummary.screen';
import { requestDirectionRoute } from '../../redux/map/mapAction';

const mapStateToProps = state => ({
  originPoint: state.mapReducer.originPoint,
  destinationPoint: state.mapReducer.destinationPoint,
  directionRoutes: state.mapReducer.directionRoutes
});
const mapDispatchToProps = dispatch => ({
  requestDirectionRoute: (direction) => dispatch(requestDirectionRoute(direction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectionSummary);
