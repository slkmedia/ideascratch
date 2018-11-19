import styled from 'styled-components';

export const ProfileMenuButton = styled.button`
  display: block;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0;
  margin-right: 32px;
  position: relative;

  &::before {
    content: '';
    background-color: #0482ff;
    border-radius: 0 4px 4px 0;
    height: 64px;
    position: absolute;
    top: 0;
    right: -32px;
    width: 32px;
  }

  &::after {
    content: '';
    border-bottom: 3px solid white;
    border-right: 3px solid white;
    border-top: 3px solid transparent;
    border-left: 3px solid transparent;
    position: absolute;
    right: -18px;
    top: 45%;
    transform: rotate(45deg);
  }

  &:hover::before,
  &:focus::before {
    background-color: #0a79e7;
  }

  &:focus {
    outline: none;
    transform: scale(0.97);
  }

  img {
    border-radius: 4px 0 0 4px;
    display: block;
    height: 64px;
    width: 64px;
  }
`;

export const ProfileMenuContainer = styled.div`
  position: relative;
`;

export const ProfileMenuDropDown = styled.ul`
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  position: absolute;
  right: -32px;
  top: 64px;
  width: 180px;

  li:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  button {
    display: block;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background-color: transparent;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: #ccc;
    }
  }
`;
