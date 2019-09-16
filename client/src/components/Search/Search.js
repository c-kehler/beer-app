import React, { Component } from "react";
import axios from "axios";
import { favoriteBeer, createBeer } from "../../services/api-helper";
import BeerInfo from "../BeerInfo/BeerInfo";
import "./Search.css";
require("dotenv").config();
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
    // console.log(process.env.API_KEY);
  };

  handleSearch = async e => {
    e.preventDefault();
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search?q=${this.state.input}&type=beer&key=${process.env.REACT_APP_API_KEY}&withBreweries=Y`
      )
      .then(res => {
        const response = res.data;
        this.setState({ beerResult: [response][0].data });
        console.log([response][0].data);
      });
  };

  renderBeers = e => {
    return this.state.beerResult.map((beer, index) => {
      return (
        <BeerInfo
          key={index}
          breweryname={beer.breweries[0].name}
          name={beer.name}
          abv={beer.abv}
          ibu={beer.ibu}
          description={beer.description}
          image={
            typeof beer.labels === "undefined"
              ? require("./beer-placeholder.jpg")
              : beer.labels.large
          }
        >
          {" "}
        </BeerInfo>
      );
    });
  };

  render() {
    return (
      <div className="search-page-container">
        <div className="search-container">
          <form onSubmit={this.handleSearch}>
            <input onChange={this.handleChange}></input>
            <button type="submit">
              <span
                class="iconify"
                data-icon="fe:search"
                data-inline="false"
              ></span>
            </button>
          </form>
        </div>

        <div className="search-results">{this.renderBeers()}</div>
      </div>
    );
  }
}
export default Search;
