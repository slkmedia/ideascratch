import React, { Fragment, Component } from 'react';
import Ideas from '../../components/Ideas';
import User404 from '../../components/User404';

export default class ProfilePage extends Component {
  state = {
    user: null,
    username: null,
    loading: true,
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

    if(user){
      this.setState({
        loading: false
      })
    }

    this.setState({ user });
  }

  render() {
    const { loggedInUser } = this.props;
    const { user, username, loading } = this.state;
    return (
      <Fragment>
        {!loading && 
        (user ? <Ideas user={user} loggedInUser={loggedInUser} /> : <User404 username={username}/>)
        }
      </Fragment>
    );
  }
}
