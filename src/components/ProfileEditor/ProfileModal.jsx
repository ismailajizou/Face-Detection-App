
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";
import AvatarChanger from "./AvatarChanger";

const ProfileModal = ({isOpen, onClose}) => {
    return ( 
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Change Avatar</ModalHeader>
          <ModalCloseButton />
          <AvatarChanger />
        </ModalContent>
      </Modal>
    );
}
 
export default ProfileModal;