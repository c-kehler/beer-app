import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
import "./LoginSignup.css";

// This component handles our login form and has a link to the register form
const LoginSignup = props => {
  if (props.currentUser) {
    return <Redirect to={`/`} />;
  }
  return (
    <div className="auth-container">
      <div className="auth-modal">
        <Tabs>
          {" "}
          <TabList>
            <Tab>Sign In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanel>
            <div className="form-container">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  props.handleLogin();
                }}
              >
                <p>Username:</p>
                <input
                  name="username"
                  type="text"
                  value={props.formData.username}
                  onChange={props.handleChange}
                />
                <p>Password:</p>
                <input
                  name="password"
                  type="password"
                  value={props.formData.password}
                  onChange={props.handleChange}
                />

                <button>
                  <span
                    class="iconify"
                    data-icon="fa-solid:lock"
                    data-inline="false"
                  ></span>
                  Login
                </button>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="form-container">
              <form onSubmit={props.handleRegister}>
                <p>Username:</p>
                <input
                  name="username"
                  type="text"
                  value={props.formData.username}
                  onChange={props.handleChange}
                />
                <p>Email:</p>
                <input
                  name="email"
                  type="text"
                  value={props.formData.email}
                  onChange={props.handleChange}
                />
                <p>Password:</p>
                <input
                  name="password"
                  type="password"
                  value={props.formData.password}
                  onChange={props.handleChange}
                />

                <button>Register</button>
              </form>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginSignup;
