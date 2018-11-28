import styled from 'styled-components';
import { Link } from '@reach/router';

export const Hero = styled.div`
  padding: 60px 20px;
  text-align: center;
`;

export const HeroHeading = styled.h1`
  color: #333;
  font-size: 48px;
  font-weight: bold;
`;

export const ProfileButton = styled(Link)`
  background-color: #0482ff;
  border: none;
  border-radius: 4px;
  color: white !important;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 16px;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: #0a79e7;
    text-decoration: none;
  }

  &:focus {
    transform: scale(0.97);
    outline: none;
  }
`;
