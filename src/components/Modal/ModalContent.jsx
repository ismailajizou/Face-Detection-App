import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toggleModal } from "../../redux/modal/modal-actions";
import { setProfile } from "../../redux/profile/profile-actions";
import { setCurrentUser } from "../../redux/user/user-actions";
import {apiURL} from '../../utils/utils'

class ModalContent extends React.Component {
  HandleFileChange = (event) => {
    const pic = event.target.files[0];
    const src = URL.createObjectURL(pic);
    this.props.dispatch(setProfile({ image: pic, src }));
  };

  onSubmitChangeProfile = (e) => {
    const { image, dispatch, currentUser } = this.props;
    const reader = new FileReader() ;
    reader.readAsDataURL(image);
    reader.onload = (event) => {
      const imageElement = document.createElement("img");
      imageElement.src = event.target.result;
      imageElement.onload = (e) => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 200;
        const scalSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scalSize;

        const context = canvas.getContext("2d");
        context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob)=> {
          const form  = new FormData();
          form.append('image', blob, image.name)
          axios.post(`${apiURL}/changeProfilePic`, form)
          .then((res) =>{
            dispatch(setCurrentUser({ ...currentUser, profileimage: res.data[0] }))
          })
          .catch((err) => console.log(err));
        })
      }
    }
  };

  render() {
    const { dispatch, currentUser, src } = this.props;
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
            <img 
            src={src ? src : currentUser.profileimage}
              className="profile-img"
              alt=""
            />
          </div>

          <div className="change-cont">
            <button className="change" onClick={() => this.fileInput.click()}>Change</button>
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
            className="save">Save</button>
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
  profile: { image, src },
}) => ({ currentUser, image, src });

export default connect(mapStateToProps)(ModalContent);
