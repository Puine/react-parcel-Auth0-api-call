
import React, { Component } from 'react';

class Ping extends Component {
  componentWillMount() {
    this.setState({ message: '' });
  }

  ping() {
    const API_URL = 'http://localhost:8080/api';
    fetch(`${API_URL}/public`)
      .then(results => {return results.json()})
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  securedPing() {
    const { getAccessToken } = this.props.auth;
    const API_URL = 'http://localhost:8080/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    fetch(API_URL+"/private", {
      method: 'GET',
      headers: headers
    })
    .then(results => {return results.json()})
    .then(response => {this.setState({ message: response.message })})
    .catch(error => this.setState({ message: error.message }));
  }

  securedScopedPing() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    fetch(`${API_URL}/private-scoped`, {
      method:'GET',
      headers:headers
    })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { message } = this.state;
    return (
      <div className="container">
        <h1>Make a Call to the Server</h1>
        {
          !isAuthenticated() &&
            <p>Log in to call a private (secured) server endpoint.</p>
        }
        <button onClick={this.ping.bind(this)}>Ping</button>
        {' '}
        {
          isAuthenticated() && (
              <button onClick={this.securedPing.bind(this)}>
                Call Private
              </button>
            )
        }
        <h2>{message}</h2>
      </div>
    );
  }
}

export default Ping;
