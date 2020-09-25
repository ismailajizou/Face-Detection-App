import React from 'react';
import { withRouter, Link} from 'react-router-dom';

const NavigationContainer = component => <nav style={{display: 'flex', justifyContent: 'flex-end'}}>{component}</nav>

const Navigation = ({ location }) => {
    const linkClass = 'f3 link dim black pa3 pointer';
    if (location.pathname === '/') {
        return (
            NavigationContainer(
                <Link to='/signin' className={linkClass} >Sign Out</Link>
            ) 
        );
    } else {
        return (
            NavigationContainer(
                <>
                <Link to='/signin' className={linkClass}>Sign In</Link>
                <Link to='/register' className={linkClass}>Register</Link>
                </>
            )
        );
    }
}
export default withRouter(Navigation);