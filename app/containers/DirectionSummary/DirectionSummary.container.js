import { connect } from 'react-redux';

import { DirectionSummary } from './DirectionSummary.screen';

const mapStateToProps = state => ({
  originPoint: state.mapReducer.originPoint,
  destinationPoint: state.mapReducer.destinationPoint
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectionSummary);
