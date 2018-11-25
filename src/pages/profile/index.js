import React, { Fragment, Component } from 'react';
import Ideas from '../../components/Ideas';

export default class ProfilePage extends Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    const { username } = this.props;

    console.log('username', username);

    const response = await fetch(
      `/.netlify/functions/getUser?username=${username}`,
    ).catch(error => {
      throw new Error('Unable to fetch user.');
    });

    if (!response.ok) return;

    const user = await response.json();

    console.log('USER', user);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return <Fragment>{user ? <Ideas user={user} /> : 'No user id'}</Fragment>;
  }
}
