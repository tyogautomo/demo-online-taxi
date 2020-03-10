import { connect } from 'react-redux';

import { Profile } from './Profile.screen';

const mapStateToProps = state => ({
  bottom: state.animatedReducer.bottom
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
