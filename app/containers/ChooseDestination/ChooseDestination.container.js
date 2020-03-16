import { connect } from 'react-redux';

import { ChooseDestination } from './ChooseDestination.screen'

const mapStateToProps = state => ({
  originPoint: state.mapReducer.originPoint
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseDestination)