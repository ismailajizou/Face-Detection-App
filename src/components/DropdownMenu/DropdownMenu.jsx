import { MenuList, MenuItem, MenuDivider, useDisclosure } from "@chakra-ui/react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setCurrentUser } from "../../redux/user/user-actions";
import AccountModal from '../AccountModal/AccountModal';
import ProfileModal from "../ProfileEditor/ProfileModal";


const DropdownMenu = ({ dispatch, history }) => {
  const { 
    isOpen: isAccountModalOpen, 
    onOpen: onAccountModalOpen, 
    onClose: onAccountModalClose
  } = useDisclosure();

  const { 
    isOpen: isProfileModalOpen, 
    onOpen: onProfileModalOpen, 
    onClose: onProfileModalClose
  } = useDisclosure();

  const logout = () => {
    dispatch(setCurrentUser(null));
    history.push('/signin');
  }
  return (
      <MenuList bgColor='rgba(255, 255, 255, 0.5)' minW="auto" ml='-6rem'>
        <MenuItem fontSize="lg" onClick={onAccountModalOpen} py={0}>
          My Account
        </MenuItem>
        <MenuDivider />
        <MenuItem fontSize="lg" onClick={onProfileModalOpen} py={0}>
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem fontSize="lg" onClick={logout} py={0}>
          Sign Out
        </MenuItem>
        <AccountModal isOpen={isAccountModalOpen} onClose={onAccountModalClose} />
        <ProfileModal isOpen={isProfileModalOpen} onClose={onProfileModalClose} />
      </MenuList>
  );
};


export default withRouter(connect()(DropdownMenu));
