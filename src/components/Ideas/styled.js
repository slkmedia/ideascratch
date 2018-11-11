import styled, { css } from 'styled-components';

export const IdeasList = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const IdeasListItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  overflow: hidden;

  &:last-child {
    border-bottom: none;
  }
`;

export const IdeasListContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 58px;
  padding: 0 0 0 24px;
  transition: 0.2s ease-in-out;
  width: 100%;

  p {
    margin: 0;
  }
`;

export const IdeasHeader = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

export const IdeasListFront = styled.div`
  align-items: center;
  border-right: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  transition: 0.2s ease-in-out;
  width: 80px;

  &:hover, &:focus {
    background-color: #f15c5c;
  }
`;

export const IdeaCreator = styled.input`
  border: 1px solid #ccc;
  background-color: #ECECEC;
  border-radius: 4px;
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 1em;
  padding: 16px 24px;
  transition: 0.2s ease-in-out;
  width: calc(100% - 48px);

  &:focus, &:hover {
    border: 1px solid #0482FF;
    outline: none;
  }
`;

export const IdeaUpvote = styled.button`
  background-color: transparent;
  border-bottom: none;
  border-left: 1px solid white;
  border-right: none;
  border-top: none;
  cursor: pointer;
  font-size: 14px;
  display: block;
  padding: 0 12px;
  height: 100%;
  transition: 0.2s ease-in-out;
  white-space: no-wrap;
  width: 35%;

  @media(min-width: 768px){
    width: 10%;
  }

  span {
    padding-left: 8px;
  }
  
  &:hover, &:focus {
    background-color: #8CD790;
    border-left: 1px solid #ccc;
    outline: none;
  }

  &:after {
    content: '👍';
    display: inline-block;
    padding-left: 8px;
    transform: rotate(0deg);
  }

  &:focus {
    animation: grow 0.5s;
  }

  ${props=> props.active && css`
    background-color: #8CD790;
    border-left: 1px solid #ccc;
  `}


  @keyframes grow {
    0% {
      transform: scale(1);
    }

    60% {
      transform: scale(1.2);
    }

    80% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
  }
`;