import React, { Component, Fragment } from 'react';

import { AccessibleText } from '../ScreenReader';
import {
  IdeasList,
  IdeasListItem,
  IdeasListContainer,
  IdeasListFront,
  IdeasHeader,
  IdeaCreator,
  IdeaUpvote,
} from './styled';

export default class Ideas extends Component {
  state = {
    authenticated: true,
    loading: true,
    ideas: [],
    ideasUpvoted: [],
    upvotedLocalStorage: window.localStorage.getItem('upvoted') || null,
  };

  componentWillMount() {
    fetch('/.netlify/functions/getIdeas')
      .then(response => response.json())
      .then(json => {
        const newIdeasUpvoted = [...json.msg].map(() => false);
        this.setState({
          ideas: json.msg,
          loading: false,
          ideasUpvoted: [...this.state.ideasUpvoted, ...newIdeasUpvoted],
        });
      });

    // Initiate local storage item if not already created
    if (this.state.upvotedLocalStorage === null) {
      window.localStorage.setItem('upvoted', '');
      this.setState({
        upvotedLocalStorage: window.localStorage.getItem('upvoted'),
      });
    }
  }

  upvote = (ideas, index) => {
    let ideasUpvoted = this.state.ideasUpvoted;
    let upvotedLocalArr = this.state.upvotedLocalStorage.split(',');

    if (
      ideasUpvoted[index] === false &&
      !upvotedLocalArr.includes(ideas[index]._id)
    ) {
      let tempStorage = null;
      ideas[index].upvotes++;
      ideasUpvoted[index] = true;

      if (this.state.upvotedLocalStorage.length > 0) {
        tempStorage = `${this.state.upvotedLocalStorage},${ideas[index]._id}`;
        this.setState({
          upvotedLocalStorage: `${this.state.upvotedLocalStorage},${
            ideas[index]._id
          }`,
        });
      } else {
        tempStorage = ideas[index]._id;
        this.setState({
          upvotedLocalStorage: ideas[index]._id,
        });
      }

      window.localStorage.setItem('upvoted', tempStorage);

      this.setState({
        ideas: ideas,
        ideasUpvoted: ideasUpvoted,
      });
    } else {
      console.log('You already upvoted this');
    }
  };

  render() {
    const { authenticated, loading, ideas, upvotedLocalStorage } = this.state;
    return (
      <Fragment>
        <IdeasHeader>
          <span role="img" aria-label="">
            💡
          </span>{' '}
          Ideas by <a href="/johnsmith">@johnsmith</a>
        </IdeasHeader>

        {authenticated && (
          <IdeaCreator placeholder="Your amazing new idea..." />
        )}

        {!loading && (
          <IdeasList>
            {ideas.map((idea, index) => {
              return (
                <IdeasListItem key={idea._id}>
                  {authenticated && (
                    <IdeasListFront>
                      <span role="img" aria-label="Delete Idea">
                        🗑
                      </span>
                    </IdeasListFront>
                  )}
                  <IdeasListContainer>
                    <p>{idea.name}</p>
                    <IdeaUpvote
                      onClick={() => this.upvote(ideas, index)}
                      active={upvotedLocalStorage.includes(idea._id)}
                      aria-label={`Delete ${idea.name}`}
                    >
                      <span>
                        <AccessibleText as="span">
                          {idea.name} has{' '}
                        </AccessibleText>
                        {idea.upvotes}
                        <AccessibleText as="span"> upvotes</AccessibleText>
                      </span>
                    </IdeaUpvote>
                  </IdeasListContainer>
                </IdeasListItem>
              );
            })}
          </IdeasList>
        )}
      </Fragment>
    );
  }
}
