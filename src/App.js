import React from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';

const particlesParams =  {
 particles: {
   number: {
     value: 170,
     density: {
       enable: true,
       value_area:  700
     }
   }
}
}
const app = new Clarifai.App({
  apiKey: 'ecee88708b03449e9d7664f7987c6f2c'
});
class App extends React.Component {
constructor(){
  super();
  this.state = {
    input: '',
    imageUrl: ''
  }
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onBtnSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(
    function(response) {
      console.log(response)
    },
    function(err) {
      // there was an error
    }
  );
  }



render(){
    return (
    <div className="App">
    <Particles 
        className='particles'
        params={particlesParams} />
      <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange}
        onBtnSubmit={this.onBtnSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      
    </div>
  );
}
  
}

export default App;
