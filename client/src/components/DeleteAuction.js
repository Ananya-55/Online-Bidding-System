import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class DeleteAuction extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      title: ''
    };
  }

  componentDidMount() {
    // Decode the token to extract user_id
    const token = localStorage.getItem('usertoken');
    if (token) {
      const decoded = jwt_decode(token);
      this.setState({ user_id: decoded.user_id });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const deleteAuction = {
      user_id: this.state.user_id,
      title: this.state.title
    };

    axios.delete('http://localhost:5000/auction-items/delete-auction', { data: deleteAuction })
      .then(res => {
        console.log('Auction deleted!');
        this.props.history.push('/view-auctions'); // Redirect to view auctions after deleting
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
            <h1 className="text-center">Delete Auction</h1>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" name="title" placeholder="Title" value={this.state.title} onChange={this.onChange} />
            </div>
            <button type="submit" className="btn btn-danger btn-block">Delete Auction</button>
          </form>
        </div>
      </div>
    );
  }
}

export default DeleteAuction;
