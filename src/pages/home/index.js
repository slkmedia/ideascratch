import React, { Fragment } from 'react';

import LoginButton from '../../components/LoginButton';
import { Hero, HeroHeading, ProfileButton } from './styled.js';

export default function HomePage({ loggedInUser, loaded }) {
  return (
    <Fragment>
      {!loaded && (
        <Hero>
          <HeroHeading>Share your ideas with the world</HeroHeading>
          {loggedInUser ? (
            <ProfileButton href={`/${loggedInUser.nickname.toLowerCase()}`}>
              Go to your Profile
            </ProfileButton>
          ) : (
            <LoginButton />
          )}
        </Hero>
      )}
    </Fragment>
  );
}
