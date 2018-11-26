import React, { Fragment, Component } from 'react';
import Ideas from '../../components/Ideas';
import User404 from '../../components/User404';

export default class ProfilePage extends Component {
  state = {
    user: null,
    username: null
  };

  async componentDidMount() {
    const { username } = this.props;

    this.setState({
      username
    })

    const response = await fetch(
      `/.netlify/functions/getUser?username=${username.toLowerCase()}`,
    ).catch(error => {
      throw new Error('Unable to fetch user.');
    });

    if (!response.ok) return;

    const user = await response.json();

    this.setState({ user });
  }

  render() {
    const { loggedInUser } = this.props;
    const { user, username } = this.state;
    return (
      <Fragment>
        {user ? <Ideas user={user} loggedInUser={loggedInUser} /> : <User404 username={username}/>}
      </Fragment>
    );
  }
}
