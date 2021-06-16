import {Component} from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user-actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import {apiURL, calculateFaceLocation} from '../../utils/utils'
import axios from "axios";
import Toast from '../Toast/Toast';


class HomePage extends Component {
      state = {
        prevInput: '',
        input: '',
        imageUrl: '',
        box: {},
      }

      displayFaceBox = (box) => this.setState({box});
      
    
    onBtnSubmit = async () => {
      const { currentUser } = this.props;
      const { input, prevInput }= this.state;
      this.setState({imageUrl: input});
      if (input !== prevInput) {
        this.setState({prevInput: input});
        try {
          const response = await axios.post(`${apiURL}/imageurl`, {input});
          if (response.data) {
            const res = await axios.put(`${apiURL}/image`, {id: currentUser.id});
            this.setState(Object.assign(currentUser, {entries: res.data.entries}));
          }
          this.displayFaceBox(calculateFaceLocation(response.data));
        } catch(err){
          Toast('Error occured', 'error',err.response.data.msg);
        }
      }
    }
    
    onInputChange = ({target: { value }}) => this.setState({input: value});

  render () {
    const {imageUrl, box} = this.state;
    const {currentUser: {name, entries}} = this.props;
    return ( 
        <>
          <Logo />
          <Rank name={name} entries={entries}/>
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