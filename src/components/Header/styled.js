import styled from 'styled-components';

export const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 36px;
  }

  a,
  a:hover,
  a:focus {
    color: #333;
    text-decoration: none;
  }
`;
