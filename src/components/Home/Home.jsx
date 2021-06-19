import {useState} from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user-actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import {apiURL, getDetectedFaces } from '../../utils/utils'
import axios from "axios";
import Toast from '../Toast/Toast';


const HomePage = ({currentUser, dispatch}) => {
  const [input, setInput] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [faces, setFaces] = useState([]);
  
  const onInputChange = ({target: { value }}) => setInput(value);
    
  const onBtnSubmit = async () => {
    setimageUrl(input);
    try {
      const response = await axios.post(`${apiURL}/imageurl`, { input });
      if (response.data) {
        const res = await axios.put(`${apiURL}/image`, {id: currentUser.id});
        dispatch(setCurrentUser(Object.assign(currentUser, {entries: res.data.entries})));
      }
      const facesArr = getDetectedFaces(response.data);
      setFaces(facesArr);
    } catch(err){
      Toast('Error occured', 'error', err.response.data.msg);
    }
  }

  return ( 
    <>
      <Logo />
      <Rank name={currentUser.name} entries={currentUser.entries}/>
      <ImageLinkForm onInputChange={onInputChange} onBtnSubmit={onBtnSubmit}/>
      <FaceRecognition imageUrl={imageUrl} faces={faces}/>
    </>
  );
}

const mapStateToProps = createStructuredSelector({ currentUser: selectCurrentUser });
 
export default connect(mapStateToProps)(HomePage);