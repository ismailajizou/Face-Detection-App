import React, {lazy, Suspense} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Spinner from './components/Spinner/Spinner';
import Particles from 'react-particles-js';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

const Signin = lazy(() => import('./components/Signin/Signin'));
const Register = lazy(() => import('./components/Register/Register'));
const HomePage = lazy(() => import('./components/Home/Home'));

const particlesParams =  {particles: {number: {value: 120, density: {enable: true,value_area:  700}}}};

const App = ({currentUser}) => {
  return(
    <div className="App">
      <Particles 
        className='particles'
        params={particlesParams} />
      <Navigation />
    <Switch >  
      <Suspense fallback={<Spinner />}>
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/register' component={Register} />
          {
            currentUser ? 
            <Route exact path='/' component={HomePage} />
            : 
            <Redirect to='/signin'/>
          }
        </Suspense> 
      </Switch>
    </div>
    );
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps)(App);
