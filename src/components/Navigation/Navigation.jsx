import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavAvatar from './NavAvatar';
import NavLinks from './NavLinks';

const Navigation = ({location, currentUser}) => {
    return (location.pathname === '/' && currentUser) ? <NavAvatar avatar={currentUser.avatar} /> : <NavLinks />;
}

const mapStateToProps = ({user: {currentUser}}) => ({currentUser});

export default withRouter(connect(mapStateToProps)(Navigation));