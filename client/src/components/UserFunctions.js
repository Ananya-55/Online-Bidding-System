
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './style.css'

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log('Registered!', res.data);
      return res.data;
    })
    .catch(err => {
      console.error('Registration error:', err.response.data);
      throw err;
    });
};

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      const token = res.data;
      localStorage.setItem('usertoken', token);
      const decoded = jwt_decode(token);
      localStorage.setItem('user_id', decoded.id);  // Store the user_id in localStorage
      return res.data;
    })
    .catch(err => {
      console.error('Login error:', err.response.data);
      throw err;
    });
};

