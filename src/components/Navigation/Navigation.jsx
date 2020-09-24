import React from 'react';
import { withRouter, Link} from 'react-router-dom';

const Navigation = ({ location }) => {
    const linkClass = 'f3 link dim black pa3 pointer';
    if (location.pathname === '/') {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link to='/signin' className={linkClass} >Sign Out</Link>
            </nav>
        );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link to='/signin' className={linkClass}>Sign In</Link>
                <Link to='/register' className={linkClass}>Register</Link>
            </nav>
        );
    }
}
export default withRouter(Navigation);