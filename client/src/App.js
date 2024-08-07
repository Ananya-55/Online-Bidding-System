import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import Auction from './components/Auction';
import CreateAuction from './components/createAuction';
import ViewAuction from './components/viewAuction';
import DeleteAuction from './components/DeleteAuction';
import UpdateAuction from './components/updateAuction';


class App extends Component {
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
      this.setState({ user_id: decoded.user_id, pa: `/user/${decoded.user_id}` });
    }
  }

  render() {
    const { pa } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/auction-items" component={Auction} />
            <Route path="/create-auction" component={CreateAuction} />
            <Route path={pa} component={ViewAuction} />
            <Route path="/delete-auction" component={DeleteAuction} />
            <Route path="/update-auction" component={UpdateAuction} />

          
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
