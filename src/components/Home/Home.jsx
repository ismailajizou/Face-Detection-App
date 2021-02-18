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
import {apiURL} from '../../utils/utils'
import axios from "axios";


class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
        }
    }
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimg');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol : clarifaiFace.left_col * width,
          topRow : clarifaiFace.top_row * height,
          rightCol : width - (clarifaiFace.right_col *width),
          bottomRow : height - (clarifaiFace.bottom_row * height)
        }
      }
    
      displayFaceBox = (box) => {
        this.setState({box: box});
      }
    
    onBtnSubmit = () => {
      const { currentUser } = this.props;
      const { input }= this.state;
      this.setState({imageUrl: input});
        axios({
              method: "post",
              url: `${apiURL}/imageurl`, 
              data: { input },
      })
        .then(response => {
          if(response.data) {
            axios({
              method: 'put',
              url: `${apiURL}/image`, 
              data: { id: currentUser.id }
            })
          .then(res => {
            this.setState(Object.assign(currentUser, { entries: res.data}))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response.data))
    })
    .catch(err => console.log(err))
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )
  (HomePage);