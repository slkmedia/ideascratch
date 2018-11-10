import styled from 'styled-components';

export const IdeasList = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const IdeasListItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const IdeasListContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  transition: 0.2s ease-in-out;
  width: 100%;

  &:hover, &:focus {
    background-color: #ECECEC;
  }

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