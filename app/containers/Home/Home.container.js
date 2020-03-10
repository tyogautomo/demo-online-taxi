import { connect } from 'react-redux';

import { Home } from './Home.screen';

const mapStateToProps = state => ({
  bottom: state.animatedReducer.bottom
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)