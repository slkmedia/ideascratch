import React, { Component, Fragment } from 'react';

import {
  IdeasList,
  IdeasListItem,
  IdeasListContainer,
  IdeasListFront,
  IdeasHeader,
  IdeaCreator
} from './styled';

export default class Ideas extends Component {

  state = {
    authenticated: true
  }

  render(){
    const { authenticated } = this.state;
    return (
      <Fragment>
        <IdeasHeader>
          💡 Ideas by <a href="#">#johnsmith</a>
        </IdeasHeader>
        {
          authenticated &&
          <IdeaCreator placeholder="Your amazing new idea..."/>
        }
        <IdeasList>
          <IdeasListItem>
            <IdeasListFront>
              🗑  
            </IdeasListFront>
            <IdeasListContainer>
              <p>
                My crazy fucking Idea
              </p>
              <p>
                200 👍
              </p>
            </IdeasListContainer>
          </IdeasListItem>
          <IdeasListItem>
            <IdeasListFront>
              🗑  
            </IdeasListFront>
            <IdeasListContainer>
              <p>
                My crazy fucking Idea
              </p>
              <p>
                200 👍
              </p>
            </IdeasListContainer>
          </IdeasListItem>
          <IdeasListItem>
            <IdeasListContainer>
              <p>
                My crazy fucking Idea
              </p>
              <p>
                200 👍
              </p>
            </IdeasListContainer>
          </IdeasListItem>
        </IdeasList>
      </Fragment>
    )
  }
}