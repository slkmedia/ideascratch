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
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:after {
    content: 'High ✋';
    position: absolute;
    top: 30%;
    right: 1.5%;
    z-index: 1;
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

export const IdeasListFront = styled.button`
  align-items: center;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  transition: 0.2s ease-in-out;
  width: 80px;
  height: 58px;
  font-size: 18px;
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: #f15c5c;
  }
`;

export const IdeaCreator = styled.input`
  border: 1px solid #ccc;
  background-color: #ececec;
  border-radius: 4px;
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 1em;
  padding: 16px 24px;
  transition: 0.2s ease-in-out;
  width: calc(100% - 48px);

  &:focus,
  &:hover {
    border: 1px solid #0482ff;
    outline: none;
  }
`;

export const IdeaUpvote = styled.button`
  background-color: white;
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
  z-index: 2;

  @media (min-width: 768px) {
    width: 10%;
  }

  span {
    padding-left: 8px;
  }

  &:hover,
  &:focus {
    background-color: #8cd790;
    border-left: 1px solid #ccc;
    outline: none;
  }

  &:after {
    content: '👍';
    display: inline-block;
    padding-left: 8px;
    transform: rotate(0deg);
  }

  ${props =>
    props.active &&
    css`
      background-color: #8cd790;
      border-left: 1px solid #ccc;

      &:focus {
        animation: reveal 1s;
      }
    `}

  @keyframes reveal {
    0% {
      transform: translateX(0px);
    }

    60% {
      transform: translateX(200px);
    }

    100% {
      transform: translateX(0px);
    }
  }
`;
