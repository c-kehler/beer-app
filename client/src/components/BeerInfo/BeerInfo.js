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
        breweryname: this.props.breweryname,
        name: this.props.name,
        image: this.props.image,
        abv: this.props.abv,
        ibu: this.props.ibu,
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
        <img src={this.props.image}></img>
        <div className="beer-info-left">
          <p className="brewery-name">{this.props.breweryname}</p>
          <p className="beer-name">{this.props.name}</p>
          <div className="ibu-abv">
            <div className="alcohol">ABV: {this.props.abv}</div>
            <div className="ibu">
              {this.props.ibu ? "IBU:" : ""} {this.props.ibu}
            </div>
          </div>
          <p className="details">{this.props.description ? "Details:" : ""}</p>
          <div className="beer-description-container">
            <div className="beer-description">{this.props.description}</div>
          </div>
        </div>
        <div className="beer-info-right">
          <div className="rating">
            <Rating
              emptySymbol="far fa-star fa-2x"
              fullSymbol="fa fa-star fa-2x"
              fractions={2}
              onClick={rate => this.handleRate(rate)}
              initialRating={this.state.value}
            />
          </div>
          <div className="button-and-text">
            <textarea onChange={this.handleChange}></textarea>
            <button onClick={this.handleFavorite}>Favorite</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BeerInfo;
