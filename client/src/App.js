import React, { Component } from 'react';
import Profile from './Profile/Profile';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const Text = isAuthenticated() ? <p>You are Logged</p> : <p>You are NOT Logged</p>;
    const Button = isAuthenticated() ? <button onClick={this.logout.bind(this)}>Log Out</button> : <button onClick={this.login.bind(this)}>Log In</button>
    const Info = isAuthenticated() ? <Profile auth = {this.props.auth}/> : "";
    const Action = isAuthenticated() ? <button onClick={this.goTo.bind(this, 'ping')}> Ping </button> : "";
    return (
      <div>
        <nav>
          {Button}
        </nav>
        {Text}
        {Info}
        {Action}
      </div>
    );
  }
}

export default App;
