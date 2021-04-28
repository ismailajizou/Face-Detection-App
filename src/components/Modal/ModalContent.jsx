import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toggleModal } from "../../redux/modal/modal-actions";
import { setProfile } from "../../redux/profile/profile-actions";
import { setCurrentUser } from "../../redux/user/user-actions";
import {apiURL, ImgSrc} from '../../utils/utils';
import LittleSpinner from '../Spinners/LittleSpinner';
import Compressor from 'compressorjs'

class ModalContent extends React.Component {

  HandleFileChange = (event) => {
    const {profile, dispatch} = this.props;
    const pic = event.target.files[0];
    const src = URL.createObjectURL(pic);
    dispatch(setProfile({ ...profile,image: pic, src}));
  };

  onSubmitChangeProfile =  async () =>{
    const { profile, dispatch, currentUser } = this.props;
    if(profile.image){
      this.props.dispatch(setProfile({...profile,isProfileLoading: true}));
      new Compressor(profile.image, {
        async success (result){
          const form = new FormData();
          form.append('image', result, profile.image.name);
          try{
            const {data} = await axios.post(`${apiURL}/changeProfilePic/${currentUser.id}`, form);
            dispatch(setProfile({src: "", image: "",isProfileLoading: false}));
            localStorage.setItem("user", JSON.stringify({ ...currentUser, profileimage: data[0] }));
            dispatch(setCurrentUser({ ...currentUser, profileimage: data[0] }));
          } catch(err){
            dispatch(setProfile({src: "", image: "", isProfileLoading: false}));
            err.response.data ? alert(err.response.data) : console.log(err);
          }
        }
      })
    }
  }

  render() {
    const { dispatch, currentUser, profile:{src, isProfileLoading} } = this.props;
    return (
      <>
        <h2 className="modal-title">Profile</h2>

        <div className="profile-cont">

        <div className="profile-input">
            <input
              onChange={this.HandleFileChange}
              ref={(fileInput) => (this.fileInput = fileInput)}
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
            />
            {isProfileLoading ? <LittleSpinner/> : null}
            <img 
              src={src ? src : ImgSrc(currentUser)}
              className={`profile-img ${isProfileLoading ? "loading" : ""}`}
              alt=""
            />

          </div>

          <div className="change-cont">
            <button className={`change ${isProfileLoading ? "not-allowed": ""}`}  onClick={() => this.fileInput.click()} disabled={isProfileLoading}>Change</button>
            <p className="requirements">JPG or PNG. Max size 100K</p>
          </div>

        </div>

          <div className="username-cont">
            <p id="username-label">Username: </p>
            <input className="username-input" value={currentUser.name} readOnly/>
          </div>

        <div className="date-joined">
          <span>You are member since:</span>
          <br/>
          <span>{new Date(currentUser.joined).toLocaleDateString()}</span>
        </div>

        <div className="btns-cont">
          <button
            type="submit"
            onClick={this.onSubmitChangeProfile}
            className={`save ${isProfileLoading ? "not-allowed": ""}`} disabled={isProfileLoading}>Save</button>
          <button
            className="cancel"
            onClick={() => dispatch(toggleModal(false))}>Cancel</button>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({
  user: { currentUser },
  profile,
}) => ({ currentUser, profile });

export default connect(mapStateToProps)(ModalContent);
