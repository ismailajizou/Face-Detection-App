import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toggleModal } from "../../redux/modal/modal-actions";
import arrayBufferToBase64 from "../../utils/utils";
import { setProfile } from "../../redux/profile/profile-actions";
import { setCurrentUser } from "../../redux/user/user-actions";

class ModalContent extends React.Component {
  HandleFileChange = (event) => {
    const pic = event.target.files[0];
    const src = URL.createObjectURL(pic);
    this.props.dispatch(setProfile({ image: pic, src }));
  };

  onSubmitChangeProfile = (e) => {
    const { image, dispatch, currentUser } = this.props;
    const fd = new FormData();
    fd.append("image", image, image.name);
    axios
      .post("https://vast-bastion-34313.herokuapp.com/changeProfilePic", fd)
      .then((res) =>
        dispatch(setCurrentUser({ ...currentUser, profileimage: res.data[0] }))
      )
      .catch((err) => console.log(err));
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
              style={{ display: "none" }}
            />
            <img src={src? src : `data:image/jpg;base64,${arrayBufferToBase64(currentUser.profileimage.data)}`}
              className="profile-img"
              alt=""
            />
          </div>

          <div className="change-cont">
            <button className="change" onClick={() => this.fileInput.click()}>Change</button>
            <p className="requirements">JPG or PNG. Max size 250K</p>
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
