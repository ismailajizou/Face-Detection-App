import {useState} from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import {apiURL, getDetectedFaces } from '../../utils/utils'
import axios from "axios";
import Toast from '../Toast/Toast';
import { setItem, useUser } from '../../context/userContext';


const HomePage = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const onInputChange = ({target: { value }}) => setInput(value);
    
  const onBtnSubmit = async () => {
    setLoading(true);
    setImageUrl(input);
    try {
      const response = await axios.post(`${apiURL}/imageurl`, { input });
      if (response.data) {
        const res = await axios.put(`${apiURL}/image`, {id: currentUser.id});
        setCurrentUser(Object.assign(currentUser, {entries: res.data.entries}));
        setItem('user', currentUser);
      }
      const facesArr = getDetectedFaces(response.data);
      setFaces(facesArr);
    } catch(err){
      Toast('Error occured', 'error', err.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  return ( 
    <>
      <Logo />
      <Rank name={currentUser.name} entries={currentUser.entries}/>
      <ImageLinkForm onInputChange={onInputChange} onBtnSubmit={onBtnSubmit} loading={loading} />
      <FaceRecognition imageUrl={imageUrl} faces={faces}/>
    </>
  );
}

 
export default HomePage;