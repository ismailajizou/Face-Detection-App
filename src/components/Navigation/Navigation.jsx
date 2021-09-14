import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import NavAvatar from './NavAvatar';
import NavLinks from './NavLinks';

const Navigation = () => {
    const location = useLocation();
    const {currentUser} = useUser();
    return (location.pathname === '/' && currentUser) ? <NavAvatar avatar={currentUser.avatar} /> : <NavLinks />;
}

export default Navigation;