import React from 'react';
import { Link } from '@reach/router';

import { isAuthenticated } from '../../utils/auth';
import confirmPageLeave from '../../utils/confirmPageLeave';
import LoginButton from '../LoginButton';
import ProfileMenu from '../ProfileMenu';
import { HeaderContainer, Logo } from './styled';

const DEFAULT_PROFILE_IMAGE =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAEAAQAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgUGBAMH/9oACAEBAAAAAPooAlbypojR26pzY1va4skLHUMvXHpquxyZTzaW1FZmG3mIYj//xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACAECEAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAxAAAAAAAP/EACcQAAIBAgUDBAMAAAAAAAAAAAECAwQRAAUQIDEhUWESE0FCIjBx/9oACAEBAAE/AP1KjOwVQSx6ADEWTSkAyShT2AviXJJlB9uQN4I9OHRkYq6kMOQduTwKsZnIBZjZT2Gub0wMInA/Jeh8jblrBqCKx4JB/t9cyZVoZb8mwG3L600zlSCUfkDANwDgkAE4zCtNQ4RQQiHoDyT32RRPNIsaC5OKSiiplFhd/ltayihqV49L/DDEsTwyNG4sw1yeBY4jOwuzmy+BtzmmDxCdR1U2PkaxIEhiQfVQNsqB4ZUP2UjT/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwAH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwAH/9k=';

const getProfileImage = profile =>
  profile ? profile.picture || DEFAULT_PROFILE_IMAGE : DEFAULT_PROFILE_IMAGE;

const isHome = window.location.pathname === '/';

export default function Header({ profile, showPageLeaveWarning }) {
  return (
    <HeaderContainer role="banner">
      <Logo>
        <Link
          to="/"
          onClick={event => confirmPageLeave(event, showPageLeaveWarning)}
        >
          IdeaScratch
        </Link>
      </Logo>
      {isAuthenticated() ? (
        <ProfileMenu
          imgSrc={getProfileImage(profile)}
          profile={profile}
          showPageLeaveWarning={showPageLeaveWarning}
        />
      ) : (
        !isHome && <LoginButton />
      )}
    </HeaderContainer>
  );
}
