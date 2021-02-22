import React from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user-actions';
import ModalPopup from '../Modal/Modal';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import {apiURL, calculateFaceLocation} from '../../utils/utils'
import axios from "axios";


class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            prevInput: '',
            input: '',
            imageUrl: '',
            box: {},
        }
    }
    
      displayFaceBox = (box) => {
        this.setState({box: box});
      }
    
    onBtnSubmit = () => {
      const { currentUser } = this.props;
      const { input, prevInput }= this.state;
      this.setState({imageUrl: input});
      if(input !== prevInput){
        this.setState({prevInput: input});
        axios
        .post(`${apiURL}/imageurl`, { input })
          .then(response => {
            if(response.data) {
              axios
              .put(`${apiURL}/image`, { id: currentUser.id })
            .then(res => {
              this.setState(Object.assign(currentUser, { entries: res.data}));
            })
        }
        this.displayFaceBox(calculateFaceLocation(response.data));
      })
      .catch(err => err.response.data ? alert(err.response.data) : console.log(err));
      }
    }
    
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

  render () {
    const {imageUrl, box} = this.state;
    const {currentUser} = this.props;
    return ( 
        <>
        <ModalPopup />
        <Logo />
        <Rank name={currentUser.name} entries={currentUser.entries}/>
        <ImageLinkForm 
            onInputChange={this.onInputChange}
            onBtnSubmit={this.onBtnSubmit}
        />
        <FaceRecognition imageUrl={imageUrl} box={box}/>
        </>
      );
    }
}

const mapStateToProps = createStructuredSelector({ currentUser: selectCurrentUser });

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )
  (HomePage);