import React, { Component } from "react";
import {
  showFavesOfUser,
  deleteBeer,
  UpdateBeerReview
} from "../../services/api-helper";
var Rating = require("react-rating").default;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBeer: [],
      newRating: 0,
      value: 0
    };
  }
  handleRate = async rate => {
    await this.setState({ value: rate });
    console.log(rate);
    console.log(this.state.value);
  };
  updateRate = async (id, rate) => {
    // this.setState({ value: rate });
    await UpdateBeerReview(id, this.state.value);
    showFavesOfUser().then(data => {
      this.setState({
        userBeer: data.beers
      });
    });
  };

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
                {...this.props}
                emptySymbol="far fa-star fa-2x"
                placeholderSymbol="fa fa-star fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={2}
                placeholderRating={beer.rating}
                onClick={rate => this.handleRate(rate)}
                onClick={async event => {
                  await this.handleRate(event);
                  this.updateRate(beer.id, event);
                }}
                // onClick={() => {
                // this.updateRate(beer.id, this.props.value);
                // console.log(this.state.value);
                // }}
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
