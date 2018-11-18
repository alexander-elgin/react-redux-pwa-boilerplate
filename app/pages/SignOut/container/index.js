import { connect } from 'react-redux';

import { signOut } from '../../../state/auth/actions';

import SignOut from '../component';

export const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(SignOut);