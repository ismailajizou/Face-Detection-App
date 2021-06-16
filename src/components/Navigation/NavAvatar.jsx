import { Flex, Avatar, Menu, MenuButton} from '@chakra-ui/react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const NavAvatar = ({avatar}) => {
    return ( 
        <Flex as="nav" justifyContent="flex-end" alignItems='center'>
            <Menu>
                <MenuButton>
                    <Avatar 
                        m={3}
                        size="md"
                        cursor='pointer'
                        src={avatar}
                        border='1px solid white'
                    />
                </MenuButton>
                <DropdownMenu />
            </Menu>
        </Flex>
     );
}
 
export default NavAvatar;