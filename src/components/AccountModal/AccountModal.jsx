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
import { connect } from 'react-redux';
import { apiURL } from '../../utils/utils'
import Toast from '../Toast/Toast';
import { setCurrentUser } from '../../redux/user/user-actions';

const AccountModal = ({ isOpen, onClose, currentUser: {id}, dispatch }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [input, setInput] = useState('');

  const handleClose = () => {
    setDeleteMode(false);
    onClose();
  }

  const handleClick = async (e) => {
    if(!deleteMode){
      setDeleteMode(true);
    } else {
      try {
        const { data } = await axios.post(`${apiURL}/deleteAccount/${id}`, {password: input});
        if(data.success){
          dispatch(setCurrentUser(null));
          Toast('Success', 'success', data.msg);
        }
      } catch (err) {
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
              <Button colorScheme="red" mr={3} onClick={(e) => handleClick(e)}>Delete account</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    );
}

const mapStateToProps = ({user: {currentUser}}) => ({currentUser});
 
export default connect(mapStateToProps)(AccountModal);