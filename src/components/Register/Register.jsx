import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';

const noErrors = {
  unvalidPwd: false,
  existingEmail: false,
  emptyField: false
};

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      name: '',
      errors: {
        unvalidPwd: false,
        existingEmail: false,
        emptyField: false
      }
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
    if (!email.length || !password.length || !name.length) {
      this.setState({errors: {...noErrors, emptyField: true}});
    } else if (password.length < 5) {
      this.setState({errors: {...noErrors, unvalidPwd: true}});
    } else {
      this.setState({errors: noErrors});
      fetch('https://vast-bastion-34313.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, name })
    })
    .then(res => res.json())
    .then(user => {
      if (user.id) {
        setCurrentUser(user);
        history.push('/');
      } else {
        this.setState({errors: {...noErrors, existingEmail: true}});
      }
    })
    } 
}

render(){
  const { existingEmail, unvalidPwd, emptyField} = this.state.errors;
  return(
    <form className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" onSubmit={this.onSubmitSignIn}>
    <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      {existingEmail ? <p className='red fw5'>Email already exists</p> 
        : unvalidPwd ?  <p className='red fw5'>Unvalid password: must contain at least 5 characters</p> 
        : emptyField ? <p className='red fw5'>Empty field</p> 
        : null }
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