import React from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {}
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
      const {currentUser} = this.props;
        this.setState({imageUrl: this.state.input});
        fetch('https://vast-bastion-34313.herokuapp.com/imageurl', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
              input: this.state.input
            })
          })
          .then(response => response.json())
        .then(response => {
          if(response) {
            fetch('https://vast-bastion-34313.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
              id: currentUser.id 
            })
          })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(currentUser, { entries: count}))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
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

const mapStateToProps = ({currentUser}) => ({currentUser});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )
  (HomePage);