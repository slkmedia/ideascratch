import styled from "styled-components";


const Container = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 8px;
  width: calc(100% - 16px);

  @media(min-width: 768px){
    padding: 0;
    width: 100%;
  }

  a {
    color: #0482FF;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Container;