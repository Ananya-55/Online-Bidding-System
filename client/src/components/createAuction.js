import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './style.css'

class CreateAuction extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '', 
      title: '',
      description: '',
      starting_bid: '',
      current_bid: '',
      end_date: ''
    };
  }
  componentDidMount() {
    // Decode the token to extract user_id
    const token = localStorage.getItem('usertoken');
    if (token) {
      const decoded = jwt_decode(token);
      console.log(decoded.user_id);
      this.setState({ user_id: decoded.user_id });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newAuction = {
      user_id: this.state.user_id, // Adjust based on your user authentication
      title: this.state.title,
      description: this.state.description,
      starting_bid: this.state.starting_bid,
      end_date: this.state.end_date
    };

    axios.post('http://localhost:5000/auction-items/create-auction', newAuction)
      .then(res => {
        this.props.history.push('/view-auction'); // Redirect to view auctions after creating
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Create Auction</h1>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" name="title" placeholder="Title" value={this.state.title} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <textarea className="form-control" name="description" placeholder="Description" value={this.state.description} onChange={this.onChange}></textarea>
            </div>
            <div className="form-group">
              <input type="number" className="form-control" name="starting_bid" placeholder="Starting Bid" value={this.state.starting_bid} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <input type="number" className="form-control" name="current_bid" placeholder="Current Bid" value={this.state.current_bid} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <input type="date" className="form-control" name="end_date" placeholder="End Date" value={this.state.end_date} onChange={this.onChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create Auction</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateAuction;
