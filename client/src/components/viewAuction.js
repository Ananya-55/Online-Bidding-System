import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './style.css'

class ViewAuction extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      auctions: []
    };
  }

  componentDidMount() {
    // Decode the token to extract user_id
    const token = localStorage.getItem('usertoken');
    if (token) {
      const decoded = jwt_decode(token);
      this.setState({ user_id: decoded.user_id }, this.fetchAuctions);
    }
  }

  fetchAuctions = () => {
    axios.get(`http://localhost:5000/auction-items/user/${this.state.user_id}`)
    // axios.get(`http://localhost:5000/auction-items/view-auctions`)
      .then(res => {
        this.setState({ auctions: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { auctions } = this.state;

    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">My Auctions</h1>
          </div>
          <div className="list-group">
            {auctions.map(auction => (
              <div className="list-group-item" key={auction.item_id}>
                <h4>{auction.title}</h4>
                <p>{auction.description}</p>
                <p>Starting Bid: {auction.starting_bid}</p>
                <p>Current Bid: {auction.current_bid}</p>
                <p>End Date: {auction.end_date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewAuction;


