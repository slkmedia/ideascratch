import styled from 'styled-components';

export const User404Container = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

export const User404Heading = styled.h1`
  color: #333;
  font-size: 32px;
  font-weight: bold;
`;

export const User404Tweet = styled.a`
  background-color: #0482ff;
  border-radius: 4px;
  color: white !important;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 16px;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: #0a79e7;
  }

  &:focus {
    transform: scale(0.97);
    outline: none;
  }
`;

export const User404TweetContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;
