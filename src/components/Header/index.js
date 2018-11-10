import React, { Component } from 'react';

import {
  HeaderContainer,
  Logo
} from './styled'

import LoginButton from '../LoginButton';
import ProfileMenu from '../ProfileMenu';

export default class Header extends Component {

  state = {
    authenicated: false
  };

  render(){
    const { authenicated } = this.state;    
    return (
      <HeaderContainer>
        <Logo>
          IdeaScratch
        </Logo>
        {
          authenicated ? 
          <ProfileMenu imgSrc="http://placehold.it/64x64"/> :
          <LoginButton/>
        }

      </HeaderContainer>
    )
  }
};