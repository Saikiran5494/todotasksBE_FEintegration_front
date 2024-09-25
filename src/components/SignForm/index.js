import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class SignForm extends Component {
  state = {
    userName: "",
    password: "",
    showUsernameError: false,
    showPasswordError: false,
    showFieldsError: false,
  };

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  formClicked = (event) => {
    event.preventDefault();
    const isValidUsername = this.validateUserName();
    const isValidPassword = this.validatePassword();

    if (isValidPassword && isValidUsername) {
      this.submitUserDetails();
    } else {
      this.setState({ showFieldsError: true });
    }
  };

  submitUserDetails = async () => {
    const { userName, password, email } = this.state;

    const userDetails = {
      userName,
      email,
      password,
    };

    let url = "";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    //const createUser = await fetch(url, options);
  };

  onBlurUsername = () => {
    const isValidUsername = this.validateUserName();
    this.setState({ showUsernameError: !isValidUsername });
  };

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail();
    this.setState({ showEmailError: !isValidEmail });
  };

  onBlurPassword = () => {
    const isValidPassword = this.validatePassword();
    this.setState({ showPasswordError: !isValidPassword });
  };

  validateUserName = () => {
    const { userName } = this.state;

    return userName !== "";
  };

  validateEmail = () => {
    const { email } = this.state;

    return email !== "";
  };

  validatePassword = () => {
    const { password } = this.state;

    return password !== "";
  };

  render() {
    const {
      userName,
      password,
      showUsernameError,
      showPasswordError,
      showFieldsError,
    } = this.state;
    const UsernameClass = showUsernameError ? "input-error" : "input";
    const passwordClass = showPasswordError ? "input-error" : "input";
    return (
      <div className="bg-container">
        <h1>SignIn Form</h1>
        <form className="form-container" onSubmit={this.formClicked}>
          <label htmlFor="username">
            Username<span> *</span>
          </label>
          <br />
          <input
            type="text"
            id="username"
            className={`${UsernameClass}`}
            onChange={this.onChangeUserName}
            value={userName}
            onBlur={this.onBlurUsername}
          />
          <br />
          {showUsernameError ? (
            <p className="error-msg">* fields are mandatory</p>
          ) : (
            ""
          )}
          <label htmlFor="password">
            Password<span> *</span>
          </label>
          <br />
          <input
            type="text"
            id="password"
            className={`${passwordClass}`}
            onChange={this.onChangePassword}
            value={password}
            onBlur={this.onBlurPassword}
          />
          <br />
          {showPasswordError || showFieldsError ? (
            <p className="error-msg">* fields are mandatory</p>
          ) : (
            ""
          )}
          <button type="submit">SignIn</button>
          <p className="have-text">
            Don't have an account ?
            <Link to="/">
              <span className="sign-in">SignUp</span>
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default SignForm;
