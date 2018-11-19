import React from 'react';

import { isAuthenticated } from '../../utils/auth';
import LoginButton from '../LoginButton';
import ProfileMenu from '../ProfileMenu';
import { HeaderContainer, Logo } from './styled';

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>IdeaScratch</Logo>
      {isAuthenticated() ? (
        <ProfileMenu imgSrc="http://placehold.it/64x64" />
      ) : (
        <LoginButton />
      )}
    </HeaderContainer>
  );
}
