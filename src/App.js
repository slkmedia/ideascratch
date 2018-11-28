import React, { Component } from 'react';
import { Router } from '@reach/router';

import { getProfile } from './utils/auth';
import Container from './components/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import CallbackPage from './pages/callback';
import TermsOfServicePage from './pages/terms-of-service';
import PrivacyPolicyPage from './pages/privacy-policy';

class App extends Component {
  state = {
    loggedInUser: null,
    loading: true,
    saving: false,
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

    if (!response.ok) {
      this.setState({
        loading: false,
      });
      return;
    }

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

    this.setState({
      loggedInUser,
      loading: false,
    });
  }

  render() {
    const { loggedInUser, loading, saving } = this.state;
    return (
      <Container>
        <Header profile={loggedInUser} showPageLeaveWarning={saving} />

        <Router>
          <HomePage loggedInUser={loggedInUser} path="/" />
          <ProfilePage
            loggedInUser={loggedInUser}
            path="/:username"
            loaded={loading}
            updateSaving={saving => this.setState({ saving })}
          />
          <CallbackPage path="/callback" />
          <TermsOfServicePage path="/terms-of-service" />
          <PrivacyPolicyPage path="/privacy-policy" />
        </Router>

        <GoogleAnalytics />

        <Footer showPageLeaveWarning={saving} />
      </Container>
    );
  }
}

export default App;
