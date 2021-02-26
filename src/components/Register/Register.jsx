import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user-actions";
import MainSpinner from "../Spinners/MainSpinner";
import {apiURL} from "../../utils/utils"
import axios from "axios";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      isLoading: false,
      errorMessage: ""
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSignIn = async event => {
    event.preventDefault();
    const { history, setCurrentUser } = this.props;
    const { email, password, name } = this.state;
    if (!email.length || !password.length || !name.length) {
      return this.setState({ errorMessage: "Empty fields !!" });
    } else if (password.length <= 6) {
      return this.setState({ errorMessage: "Unvalid password: must contain at least 6 characters" });
    } else {
      this.setState({ isLoading: true });
      try {
        const res = await axios.post(`${apiURL}/register`, { email, password, name });
        if (res.data.id) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setCurrentUser(res.data);
          this.setState({ isLoading: false });
          history.push("/");
        }
      }catch(err){
        this.setState({ isLoading: false, errorMessage: err.response.data });
      }
    }
  };

  render() {
    const { errorMessage, isLoading } = this.state;
    if (isLoading) {
      return <MainSpinner />;
    } else {
      return (
        <form
          className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
          onSubmit={this.onSubmitSignIn}
        >
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                {errorMessage ? <p className="red fw5">{errorMessage}</p> : null}
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email"
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
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
                >
                  Register
                </button>
              </div>
            </div>
          </main>
        </form>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(Register);
