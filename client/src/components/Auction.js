import React from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './style.css'

class Auction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      pa: ''
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('usertoken');
    if (token) {
      const decoded = jwt_decode(token);
      console.log(decoded.user_id);
      this.setState({ user_id: decoded.user_id, pa: `/user/${decoded.user_id}` });
    }
  }

  render() {
    const { pa } = this.state;

    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Manage Auctions</h1>
          </div>
          <div className="text-center">
            <Link to="/create-auction" className="btn btn-primary m-2">Create Auction</Link>
            <Link to={pa} className="btn btn-secondary m-2">View Auctions</Link>
            <Link to="/update-auction" className="btn btn-warning m-2">Update Auction</Link>
            <Link to="/delete-auction" className="btn btn-danger m-2">Delete Auction</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Auction;


