import "./App.css";
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

import decode from "jwt-decode";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search/Search";
import Dashboard from "./components/Dashboard/Dashboard";
import { loginUser, registerUser } from "./services/api-helper";
class App extends Component {
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
  handleLoginButton = () => {
    this.props.history.push("/login");
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
    this.handleLogin();
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
      <div className="App">
        <header>
          <div>
            {this.state.currentUser ? (
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>Logout</button>
              </>
            ) : (
              <button onClick={this.handleLoginButton}>Login / Register</button>
            )}
            <a href="/search">search</a>
            <a href="/dashboard">dashboard</a>
          </div>
        </header>
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData}
            />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData}
            />
          )}
        />
        <Route exact path="/search" render={() => <Search />} />
        <Route exact path="/dashboard" render={() => <Dashboard />} />
      </div>
    );
  }
}
export default withRouter(App);
