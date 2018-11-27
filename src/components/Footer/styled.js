import styled from 'styled-components';

export const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  text-align: center;
  margin: 32px 0;

  @media (min-width: 768px){
    flex-direction: row;
  }
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
  padding: 8px 10px;
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

export const Legal = styled.span`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 15px 0;

  @media (min-width: 768px){
    border-left: 1px solid #ccc;
    flex-direction: row;
    margin-left: 10px;
    padding: 0 15px 0 10px;
  }
`;

export const CreatedBy = styled.span`
`;

export const FooterLeft = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  width: 100%;

  @media (min-width: 768px){
    flex-direction: row;
  }
`