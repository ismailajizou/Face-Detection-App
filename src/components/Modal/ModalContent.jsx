import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/modal/modal-actions';
import arrayBufferToBase64 from '../../utils/utils'

class ModalContent extends React.Component {
    constructor() {
        super();
        this.state = { 
            profilePic: '' ,
            src: '',
         }
    }


    HandleFileChange = event => {
        const pic = event.target.files[0]
        const src = URL.createObjectURL(pic)
        this.setState({profilePic: pic, src})
      }
      
    onSubmitChangeProfile = e  => {
        const {profilePic} = this.state;
        console.log(profilePic);
        const fd = new FormData();
        fd.append('image', profilePic, profilePic.name);
        axios
        .post(`http://localhost:3000/changeProfilePic`, fd)
        .then(console.log)
        .catch(err => console.log(err));
    
    }
    
    render() { 
        const { src } = this.state;
        const {dispatch, currentUser} = this.props;
        console.log('3-',currentUser.profileimage)
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
                    src={src? src : `data:image/jpg;base64,${arrayBufferToBase64(currentUser.profileimage.data)}`}
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
const mapStateToProps = ({user: {currentUser}}) => ({currentUser});
 
export default connect(mapStateToProps)(ModalContent);