import React, { Component } from 'react';

import {
  ProfileMenuContainer,
  ProfileMenuButton,
  ProfileMenuDropDown
} from './styled';

export default class ProfileMenu extends Component {

  ref = React.createRef();

  state = {
    isOpen: false
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('touchstart', this.onWindowClick);
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  }

  handleClick = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  onWindowClick = ({target}) => {
    const el = this.ref.current;

    if(el !== target && !el.contains(target) && this.state.isOpen){
      this.setState(state => ({ isOpen: !state.isOpen }));
    }
  }

  render(){
    const { isOpen } = this.state;
    const { imgSrc } = this.props;
    return (
      <ProfileMenuContainer ref={this.ref}>
        <ProfileMenuButton onClick={this.handleClick}>
          <img src={imgSrc} />
        </ProfileMenuButton>
        {
          isOpen && 
          <ProfileMenuDropDown>
            <li>Item 1</li>
            <li>Item 2</li>
          </ProfileMenuDropDown>
        }
      </ProfileMenuContainer>
    )
  }
}