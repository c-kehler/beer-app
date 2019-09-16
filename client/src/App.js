import "./App.css";
import React, { Component } from "react";
import { withRouter } from "react-router";

import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}
export default withRouter(App);
