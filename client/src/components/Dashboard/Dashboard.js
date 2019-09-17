import React, { Component } from "react";
import {
  showFavesOfUser,
  deleteBeer,
  UpdateBeerReview
} from "../../services/api-helper";
import "./Dashboard.css";

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
      <div className="dashboard-page-container">
        {this.state.userBeer.map(beer => {
          return (
            <div className="dashboard-beer-info">
              <img src={beer.image}></img>
              <div className="beer-info-left">
                <p className="brewery-name">{beer.breweryname}</p>
                <p className="beer-name">{beer.name}</p>
                <div className="ibu-abv">
                  <div className="alcohol">ABV: {beer.abv}</div>
                  <div className="ibu">
                    {beer.ibu ? "IBU:" : ""} {beer.ibu}
                  </div>
                </div>
                <p className="details">{beer.description ? "Details:" : ""}</p>
                <div className="beer-description-container">
                  <p>{beer.description}</p>
                </div>
              </div>

              <div className="beer-info-right">
                <div className="rating">
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
                </div>
                <div className="button-and-text">
                  <p className="notes">{beer.review ? "My Notes:" : ""}</p>
                  <div className="notes-container">
                    <p>{beer.review}</p>
                  </div>
                  <button
                    onClick={() => {
                      this.handleDelete(beer.id);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
