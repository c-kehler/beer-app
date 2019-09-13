import React, { Component } from "react";
import { favoriteBeer, createBeer, getBeerId } from "../../services/api-helper";

class BeerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFavorite = async e => {
    e.preventDefault();
    let id = null;
    let beerObject = {
      beer: {
        name: this.props.name,
        image: this.props.image,
        description: this.props.description,
        rating: 5
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
      <div>
        <div>{this.props.name}</div>
        <img src={this.props.image}></img>
        <div>{this.props.description}</div>
        <div>{this.props.rating}</div>
        <button onClick={this.handleFavorite}>Favorite</button>
      </div>
    );
  }
}

export default BeerInfo;
