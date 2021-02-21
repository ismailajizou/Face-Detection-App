import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toggleModal } from "../../redux/modal/modal-actions";
import { setProfile } from "../../redux/profile/profile-actions";
import { setCurrentUser } from "../../redux/user/user-actions";
import {apiURL, ImgSrc} from '../../utils/utils'
import LittleSpinner from '../Spinners/LittleSpinner';

class ModalContent extends React.Component {

  HandleFileChange = (event) => {
    const {profile, dispatch} = this.props;
    const pic = event.target.files[0];
    const src = URL.createObjectURL(pic);
    dispatch(setProfile({ ...profile,image: pic, src}));
  };

  onSubmitChangeProfile = (e) => {
    const { profile, dispatch, currentUser } = this.props;
    this.props.dispatch(setProfile({...profile,isProfileLoading: true}));
    const reader = new FileReader() ;
    reader.readAsDataURL(profile.image);
    reader.onload = (event) => {
      const imageElement = document.createElement("img");
      imageElement.src = event.target.result;
      imageElement.onload = (e) => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 100;
        const scalSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scalSize;

        const context = canvas.getContext("2d");
        context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob)=> {
          const form  = new FormData();
          form.append('image', blob, profile.image.name)
          axios.post(`${apiURL}/changeProfilePic`, form)
          .then(({data}) =>{
            this.props.dispatch(setProfile({...profile,isProfileLoading: false}));
            localStorage.setItem("user", JSON.stringify({ ...currentUser, profileimage: data[0] }))
            dispatch(setCurrentUser({ ...currentUser, profileimage: data[0] }))
          })
          .catch((err) => {
            this.props.dispatch(setProfile({...profile, isProfileLoading: false}));
            err.response.data ? alert(err.response.data) : console.log(err);
          });
        })
      }
    }
  };

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
