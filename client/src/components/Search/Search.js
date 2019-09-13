import React, { Component } from "react";
import axios from "axios";
import { favoriteBeer, createBeer } from "../../services/api-helper";
import BeerInfo from "../BeerInfo/BeerInfo";
var Rating = require("react-rating");

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      beerResult: []
    };
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  handleSearch = async e => {
    e.preventDefault();
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search?q=${this.state.input}&type=beer&key=eeb5c6ac9e5bebeffcfce34709baa07f`
      )
      .then(res => {
        const response = res.data;
        this.setState({ beerResult: [response][0].data });
        console.log(this.state.beerResult);
      });
  };

  renderBeers = e => {
    return this.state.beerResult.map((beer, index) => {
      return (
        <BeerInfo
          key={index}
          name={beer.name}
          description={beer.description}
          image={
            typeof beer.labels === "undefined" ? "test" : beer.labels.large
          }
        >
          {" "}
        </BeerInfo>
      );
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input onChange={this.handleChange}></input>
          <button type="submit">search</button>
        </form>
        {this.renderBeers()}
      </div>
    );
  }
}
export default Search;
