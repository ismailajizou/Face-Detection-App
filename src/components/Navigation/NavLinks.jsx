import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
    return ( 
        <Flex as="nav" justifyContent='flex-end' h="20" alignItems='center'>
            <Link to='/signin' style={stylesheet}>
                Sign In
            </Link>
            <Link to='/register' style={stylesheet}>
                Register
            </Link>
        </Flex>
     );
}

const stylesheet = {
    fontSize: "1.5rem",
    marginRight: '2rem'
}
 
export default NavLinks;