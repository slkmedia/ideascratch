import styled from 'styled-components';

export const BlueButton = styled.button`
  background-color: #0482ff;
  border: none;
  border-radius: 4px;
  color: white;
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
