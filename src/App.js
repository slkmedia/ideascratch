import React, { Component } from 'react';
import { Router } from '@reach/router';

import { getProfile } from './utils/auth';
import Container from './components/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import CallbackPage from './pages/callback';

class App extends Component {
  state = {
    loggedInUser: null,
  };

  async componentDidMount() {
    // TODO: Get based on dashboard or profile view
    const loggedInUser = await getProfile().catch(error => {
      console.error('Could not fetch profile', error);
    });

    console.log('LOGGED IN PROFILE', loggedInUser);

    if (!loggedInUser) return;

    const twitterId = loggedInUser.sub.split('|')[1];
    const twitterName = loggedInUser.name;
    const twitterUsername = loggedInUser.nickname;

    console.log('logged in data', { twitterId, twitterName, twitterUsername });

    const response = await fetch(
      `/.netlify/functions/getUser?username=${twitterUsername}`,
    ).catch(error => {
      throw new Error('Unable to fetch user.');
    });

    if (!response.ok) return;

    const user = await response.json();

    console.log('USER', user);

    if (!user) {
      await fetch('/.netlify/functions/createUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          twitterUsername,
          twitterName,
          twitterId,
        }),
      });
    }

    this.setState({ loggedInUser });
  }

  render() {
    const { loggedInUser } = this.state;
    return (
      <Container>
        <Header profile={loggedInUser} />
        <Router>
          <HomePage profile={loggedInUser} path="/" />
          <ProfilePage path="/:username" />
          <CallbackPage path="/callback" />
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
