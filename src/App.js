import React, { Component } from 'react';
import { Router } from '@reach/router';

import { getProfile } from './utils/auth';
import Container from './components/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import CallbackPage from './pages/callback';
import TermsOfService from './pages/terms-of-service';

class App extends Component {
  state = {
    loggedInUser: null,
  };

  async componentDidMount() {
    const loggedInUser = await getProfile().catch(error => {});

    if (!loggedInUser) return;

    const twitterId = loggedInUser.sub.split('|')[1];
    const twitterName = loggedInUser.name;
    const twitterUsername = loggedInUser.nickname.toLowerCase();

    const response = await fetch(
      `/.netlify/functions/getUser?username=${twitterUsername}`,
    ).catch(error => {});

    if (!response.ok) return;

    const user = await response.json();

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
          <HomePage loggedInUser={loggedInUser} path="/" />
          <ProfilePage loggedInUser={loggedInUser} path="/:username" />
          <CallbackPage path="/callback" />
          <TermsOfService path="/terms-of-service"/>
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
