import React, { Fragment, Component } from 'react';
import Ideas from '../../components/Ideas';
import User404 from '../../components/User404';

export default class ProfilePage extends Component {
  state = {
    user: null,
    username: null,
    loading: true,
  };

  componentDidMount() {
    const { username, loaded } = this.props;
    if (loaded) this.fetchUser(username);
  }

  componentDidUpdate(prevProps) {
    const { username, loaded, loggedInUser } = this.props;
    const loggedInUsername = loggedInUser && loggedInUser.nickname;

    if (
      prevProps.username !== username ||
      (prevProps.loaded !== loaded && loggedInUsername === username)
    ) {
      this.fetchUser(username);
    }
  }

  async fetchUser(username) {
    this.setState({
      username,
      loading: true,
    });

    const response = await fetch(
      `/.netlify/functions/getUser?username=${username.toLowerCase()}`,
    ).catch(error => {
      throw new Error('Unable to fetch user.');
    });

    if (!response.ok) return;

    const user = await response.json();

    this.setState({
      loading: false,
      user,
    });
  }

  render() {
    const { loaded, loggedInUser, updateSaving } = this.props;
    const { user, username, loading } = this.state;
    return (
      <Fragment>
        {loaded &&
          !loading &&
          (user ? (
            <Ideas
              user={user}
              loggedInUser={loggedInUser}
              updateSaving={updateSaving}
            />
          ) : (
            <User404 username={username} />
          ))}
      </Fragment>
    );
  }
}
