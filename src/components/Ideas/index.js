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
    authenticated: true,
    loading: true,
    ideas: []
  }

  componentWillMount(){
    fetch('/.netlify/functions/getIdeas')
      .then(response => response.json())
      .then(json => this.setState({ ideas: json.msg, load: false }));
  }

  render(){
    const { authenticated, loading, ideas } = this.state;
    return (
      <Fragment>
        <IdeasHeader>
          💡 Ideas by <a href="#">@johnsmith</a>
        </IdeasHeader>
        {
          authenticated &&
          <IdeaCreator placeholder="Your amazing new idea..."/>
        }
         <IdeasList>
        {
          ideas.map(function(d){
            return (
              <IdeasListItem>
                {
                  authenticated &&
                  <IdeasListFront>
                    🗑  
                  </IdeasListFront>
                }
                <IdeasListContainer>
                  <p>
                    {d.name}
                  </p>
                  <p>
                    {d.upvotes} 👍
                  </p>
                </IdeasListContainer>
              </IdeasListItem>
            )
          })
        }
        </IdeasList>
      </Fragment>
    )
  }
}