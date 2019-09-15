import React, { Component } from "react";
import { favoriteBeer, createBeer, getBeerId } from "../../services/api-helper";
import "./BeerInfo.css";
var Rating = require("react-rating").default;

class BeerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      value: 0
    };
  }

  handleRate(rate) {
    this.setState({ value: rate });
    console.log(rate);
    console.log(this.state.value);
  }

  handleChange = event => {
    this.setState({
      notes: event.target.value
    });
  };

  handleFavorite = async e => {
    e.preventDefault();
    let id = null;
    let beerObject = {
      beer: {
        name: this.props.name,
        image: this.props.image,
        description: this.props.description,
        rating: this.state.value,
        review: this.state.notes
      }
    };
    console.log(id);
    console.log(beerObject);
    await createBeer(beerObject);
    id = await getBeerId(this.props.name);
    await favoriteBeer(id);
  };
  render() {
    return (
      <div className="beer-info">
        <div className="beer-name">{this.props.name}</div>
        <img src={this.props.image}></img>
        <div className="beer-description">{this.props.description}</div>
        <div className="rating">
          <Rating
            emptySymbol="far fa-star fa"
            fullSymbol="fa fa-star fa"
            fractions={2}
            onClick={rate => this.handleRate(rate)}
            initialRating={this.state.value}
          />
        </div>
        <textarea onChange={this.handleChange}></textarea>
        <button onClick={this.handleFavorite}>Favorite</button>
      </div>
    );
  }
}

export default BeerInfo;
