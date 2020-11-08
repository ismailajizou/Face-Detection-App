import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/modal/modal-actions';
import arrayBufferToBase64 from '../../utils/utils';
import {setProfile} from '../../redux/profile/profile-actions';


class ModalContent extends React.Component {

    HandleFileChange = event => {
        const pic = event.target.files[0]
        const src = URL.createObjectURL(pic);
        this.props.dispatch(setProfile({image: pic, src}));
      }
      
    onSubmitChangeProfile = e  => {
        const { image } = this.props;
        const fd = new FormData();
        fd.append('image', image, image.name);
        axios
        .post(`'https://vast-bastion-34313.herokuapp.com/changeProfilePic`, fd)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    
    }
    
    render() { 
        const {dispatch, currentUser, src} = this.props;
        return ( 
            <>
                <h2 className='modal-title tc'>Profile</h2>
                <div className="pa2 profile-username">
                    <input 
                    onChange={this.HandleFileChange}
                    ref={fileInput => this.fileInput = fileInput}
                    type='file' className='input-file' style={{display: 'none'}}/>
                    <img 
                    onClick={() => this.fileInput.click()}
                    src={src ? src : `data:image/jpg;base64,${arrayBufferToBase64(currentUser.profileimage.data)}`}
                    className="br-100 ba pointer profile-change" alt="" />
                    <h3 className='username'>{currentUser.name}</h3>
                </div>
                <div className='date-joined flex flex-column'>
                <span>You are member since: ...</span>
                <span>{new Date(currentUser.joined).toLocaleDateString()}</span>
                </div>
                <div className='btns-container'>
                <button type='submit' onClick={this.onSubmitChangeProfile} className='submit-profile'>Submit</button>
                <button className='cancel-modal' onClick={() => dispatch(toggleModal(false))}>Cancel</button>
            </div>
            </>
         );
    }
}
const mapStateToProps = ({user: {currentUser}, profile:{image, src}}) => ({currentUser, image, src});
 
export default connect(mapStateToProps)(ModalContent);