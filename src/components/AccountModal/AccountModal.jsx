import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    ModalCloseButton,
  } from "@chakra-ui/react"
import AccountModalContent from "./AccountModalContent";
import axios from 'axios';
import { apiURL } from '../../utils/utils'
import Toast from '../Toast/Toast';
import { useUser } from '../../context/userContext';

const AccountModal = ({ isOpen, onClose }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser,setCurrentUser } = useUser();

  const handleClose = () => {
    setDeleteMode(false);
    onClose();
  }

  const handleClick = async (e) => {
    if(!deleteMode){
      setDeleteMode(true);
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(`${apiURL}/deleteAccount/${currentUser.id}`, {password: input});
        if(data.success){
          setLoading(false);
          setCurrentUser(null);
          Toast('Success', 'success', data.msg);
        }
      } catch (err) {
        setLoading(false);
        Toast('Error occured', 'error', err.response.data.msg);
      }
    }
  }

    return ( 
        <Modal isOpen={isOpen} onClose={() => handleClose()}>
          <ModalOverlay />
          <ModalContent>

            <ModalHeader textAlign='center' fontSize='3xl' fontWeight='bold'>My Account</ModalHeader>
            <ModalCloseButton />
            <AccountModalContent deleteMode={deleteMode} setDeleteMode={setDeleteMode} handleChange={setInput} />

            <ModalFooter>
              <Button colorScheme="red" mr={3} isLoading={loading} loadingText='Deleting' onClick={(e) => handleClick(e)}>Delete account</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    );
}

 
export default AccountModal;