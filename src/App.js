import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
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
class App extends React.Component {
constructor(){
  super();
  this.state = {
    input: '',
  }
}

  onInputChange = (event) => {
    console.log(event.target.value);
  }
  onBtnSubmit = () => {
    console.log('click');
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
        {/* <FaceRecognition /> */}
      
    </div>
  );
}
  
}

export default App;
