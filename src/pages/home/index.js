import React, { Component } from 'react';
import { navigate } from '@reach/router';

export default class HomePage extends Component {
  // After login, navigate user to their profile page.
  static getDerivedStateFromProps(props) {
    const { loggedInUser } = props;
    if (loggedInUser && loggedInUser.nickname) {
      navigate(`/${loggedInUser.nickname}`);
    }
  }

  render() {
    return <div>Welcome, please sign in to create your next idea.</div>;
  }
}
