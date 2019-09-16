import React, { Component } from "react";
import decode from "jwt-decode";
import { loginUser, registerUser } from "../../services/api-helper";
import { withRouter } from "react-router";
import LoginSignup from "../Auth/LoginSignup";
import Search from "../Search/Search";
import Dashboard from "../Dashboard/Dashboard";
import { Route, Link, Redirect } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  handleLoginButton = async () => {
    await this.props.history.push("/login");
  };

  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: decode(userData.token)
    });
    localStorage.setItem("jwt", userData.token);
    localStorage.setItem("userId", userData.id);
  };

  handleRegister = async e => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    await this.handleLogin();
  };

  handleLogout = async () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    });
  };

  authHandleChange = async e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  };

  componentDidMount() {
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      });
    }
  }
  render() {
    return (
      <header className="page-container">
        <div className="navbar-container">
          <a className="search-link" href="/">
            Beer-o-meter
          </a>
          {this.state.currentUser ? (
            <React.Fragment>
              <a className="dashboard-link" href="/dashboard">
                Dashboard
              </a>
              <a className="username">{this.state.currentUser.username}</a>
            </React.Fragment>
          ) : (
            <p></p>
          )}
          {this.state.currentUser ? (
            <a onClick={this.handleLogout}>Logout</a>
          ) : (
            <a onClick={this.handleLoginButton}>Login</a>
          )}
        </div>
        <div>
          <Route
            exact
            path="/login"
            render={() => (
              <LoginSignup
                handleLogin={this.handleLogin}
                handleChange={this.authHandleChange}
                formData={this.state.authFormData}
                handleRegister={this.handleRegister}
                currentUser={this.state.currentUser}
              />
            )}
          />

          <Route exact path="/" render={() => <Search />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
        </div>
      </header>
    );
  }
}

export default withRouter(Navbar);
