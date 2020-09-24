import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

onInputChange = event => {
  const {name, value} = event.target;
  this.setState({[name]: value});
}

  onSubmitSignIn = event => {
    event.preventDefault();
    const { history, setCurrentUser } = this.props;
    const {email, password, name} = this.state;
    fetch('https://vast-bastion-34313.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
    .then(res => res.json())
    .then(user => {
      if (user.id) {
        setCurrentUser(user);
        history.push('/');
      }
    })  
  }

render(){
  return(
    <form className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" onSubmit={this.onSubmitSignIn}>
    <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="name"
        onChange={this.onInputChange}
        />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email"  
        onChange={this.onInputChange}
        />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"   
        onChange={this.onInputChange}
        />
      </div>
    </fieldset>
    <div>
      <button
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit"  
      >Register</button>
    </div>
  </div>
</main>
</form>
);
}
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(Register);