import React, { Component } from "react";
import { showFavesOfUser } from "../../services/api-helper";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBeer: []
    };
  }

  componentWillMount() {
    showFavesOfUser().then(data => {
      this.setState({
        userBeer: data.beers
      });
      console.log(this.state.userBeer);
    });
  }

  render() {
    return (
      <div>
        {this.state.userBeer.map(beer => {
          return (
            <div>
              <p>{beer.name}</p>
              <img src={beer.image}></img>
              <p>{beer.description}</p>
              <p>{beer.rating}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
