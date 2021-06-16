import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
  } from "@chakra-ui/react"
import AccountModalContent from "./AccountModalContent";

const AccountModal = ({ isOpen, onClose }) => {
    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>

            <ModalHeader textAlign='center' fontSize='3xl' fontWeight='bold'>My Account</ModalHeader>
            <AccountModalContent />

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    );
}
 
export default AccountModal;