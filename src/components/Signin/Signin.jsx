import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../redux/user/user-actions";
import Spinner from "../Spinner/Spinner";

const noErrors = {
  emptyField: false,
  noUser: false,
};
class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      errors: {
        emptyField: false,
        noUser: false,
      },
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();
    const { history, setCurrentUser } = this.props;
    const { email, password } = this.state;
    if (!email.length || !password.length) {
      return this.setState({ errors: { ...noErrors, emptyField: true } });
    } else {
      this.setState({ errors: noErrors, isLoading: true });
      fetch("https://vast-bastion-34313.herokuapp.com/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) =>{
            this.setState({ isLoading: false });      
            return res.json();
        })
        .then((user) => {
          if (user.id) {
            setCurrentUser(user);
            history.push("/");
          } else {
            this.setState({ errors: { ...noErrors, noUser: true } });
          }
        });
    }
  };

  render() {
    const { emptyField, noUser } = this.state.errors;
    if (this.state.isLoading) {
      return <Spinner />;
    } else {
      return (
        <form
          className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
          onSubmit={this.onSubmitSignIn}
        >
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                {emptyField ? (
                  <p className="red fw5">Empty field</p>
                ) : noUser ? (
                  <p className="red fw5">No such user</p>
                ) : null}
                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Email</label>
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
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className="lh-copy mt3">
                <Link to="/register" className="f6 pointer link dim black db">
                  Register
                </Link>
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
export default connect(null, mapDispatchToProps)(Signin);
