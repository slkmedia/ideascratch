import React, { Component, Fragment } from 'react';
import { navigate } from '@reach/router';
import LoginButton from '../../components/LoginButton';

import { Hero, HeroHeading, ProfileButton } from './styled.js';

export default class HomePage extends Component {
  // After login, navigate user to their profile page.
  componentDidUpdate() {
    const { loggedInUser } = this.props;
    if (loggedInUser && loggedInUser.nickname) {
      navigate(`/${loggedInUser.nickname}`);
    }
  }

  render() {
    const { loggedInUser, loaded } = this.props;
    return (
      <Fragment>
        {!loaded && 
        <Hero>
          <HeroHeading>Share your ideas with the world</HeroHeading>
          {!loggedInUser ? 
          (<LoginButton />)  :(
            <ProfileButton href={"/" + loggedInUser.nickname.toLowerCase()}>
              Go to your Profile
            </ProfileButton>
          )}
        </Hero>
        }
      </Fragment>
    );
  }
}
