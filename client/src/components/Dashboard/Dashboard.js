import React, { Component } from "react";
import { showFavesOfUser, deleteBeer } from "../../services/api-helper";
var Rating = require("react-rating").default;
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
  handleDelete = async id => {
    await deleteBeer(id);
    await showFavesOfUser().then(data => {
      this.setState({
        userBeer: data.beers
      });
    });
    console.log(this.state.userBeer);
  };

  render() {
    return (
      <div>
        {this.state.userBeer.map(beer => {
          return (
            <div>
              <p>{beer.name}</p>
              <img src={beer.image}></img>
              <p>{beer.description}</p>
              <p>{beer.review}</p>
              <Rating
                emptySymbol="far fa-star fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={2}
                initialRating={beer.rating}
                readonly
              />
              <button
                onClick={() => {
                  this.handleDelete(beer.id);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
