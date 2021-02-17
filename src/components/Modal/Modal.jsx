import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import './Modal.css';
import ModalContent from './ModalContent';

Modal.setAppElement('#root')
const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

class ModalPopup extends React.Component{
  render(){
    const {isModalOpen} = this.props;
    return ( 
        <Modal style={customStyles} isOpen={isModalOpen} className='modal-container'>
            <ModalContent/>
        </Modal>
     );
  }

}
 
const mapStateToProps = ({modal: {isModalOpen}}) => ({isModalOpen});
export default connect(mapStateToProps)(ModalPopup);