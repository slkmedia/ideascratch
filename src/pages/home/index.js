import React, { Component } from 'react';
import { navigate } from '@reach/router';
import LoginButton from '../../components/LoginButton';

import { Hero, HeroHeading } from './styled.js';

export default class HomePage extends Component {
  // After login, navigate user to their profile page.
  componentDidUpdate() {
    const { loggedInUser } = this.props;
    if (loggedInUser && loggedInUser.nickname) {
      navigate(`/${loggedInUser.nickname}`);
    }
  }

  render() {
    return (
      <Hero>
        <HeroHeading>Share your ideas with the world</HeroHeading>
        <LoginButton />
      </Hero>
    );
  }
}
