import styled from 'styled-components';

export const Footer = styled.div`
  font-size: 14px;
  text-align: center;
  margin: 32px 0;
`;

export const CoffeeButton = styled.a`
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333 !important;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  margin: 30px auto 0 auto;
  padding: 12px 16px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  width: 150px;

  div {
    margin-left: 5px;
  }

  &:hover,
  &:focus {
    border: 1px solid #0482ff;
    color: #0482ff !important;
    text-decoration: none !important;
  }

  &:focus {
    transform: scale(0.97);
    outline: none;
  }
`;
