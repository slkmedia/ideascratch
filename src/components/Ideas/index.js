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
    isEditable: false,
    loading: true,
    error: null,
    ideas: [],
    ideasUpvoted: [],
    upvotedLocalStorage: window.localStorage.getItem('upvoted') || '',
    value: '',
  };

  async componentDidMount() {
    // Initiate local storage item if not already created
    if (this.state.upvotedLocalStorage === null) {
      window.localStorage.setItem('upvoted', '');
      this.setState({
        upvotedLocalStorage: window.localStorage.getItem('upvoted'),
      });
    }

    await this.getIdeas();
  }

  // Checks if user is allowed to edit this profile.
  static getDerivedStateFromProps(props) {
    const { loggedInUser, user } = props;
    if (loggedInUser && loggedInUser.sub) {
      const twitterId = loggedInUser.sub.split('|')[1];
      return {
        isEditable: user.twitterId === twitterId,
      };
    }
    return {};
  }

  async getIdeas() {
    const { user } = this.props;
    const response = await fetch(
      `/.netlify/functions/getIdeas?userId=${user._id}`,
    ).catch(error => {});

    if (!response.ok) {
      this.setState({ error: 'Unable to fetch ideas.' });
      return;
    }

    const ideas = (await response.json()) || [];
    const newIdeasUpvoted = [...ideas].map(() => false);

    this.setState({
      loading: false,
      error: null,
      ideas,
      ideasUpvoted: [...this.state.ideasUpvoted, ...newIdeasUpvoted],
    });
  }

  upvote = (ideas, index) => {
    let ideasUpvoted = this.state.ideasUpvoted;
    let upvotedLocalArr = this.state.upvotedLocalStorage.split(',');

    if (
      ideasUpvoted[index] === false &&
      !upvotedLocalArr.includes(ideas[index]._id)
    ) {
      fetch('/.netlify/functions/upvote', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ideas[index]._id,
        }),
      });

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

  deleteIdea = id => {
    fetch('/.netlify/functions/deleteIdea', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    const indexToRemove = this.getItem(id);

    this.setState({
      ideas: [
        ...this.state.ideas.slice(0, indexToRemove),
        ...this.state.ideas.slice(indexToRemove + 1),
      ],
    });
  };

  getItem(id) {
    let item;
    [...this.state.ideas].forEach((idea, index) => {
      if (idea._id === id) {
        item = index;
      }
    });
    return item;
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.value === '') return;

    const { user } = this.props;

    fetch('/.netlify/functions/createIdea', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idea: this.state.value,
        userId: user._id,
      }),
    }).then(() => {
      this.getIdeas();
    });

    this.setState({ value: '' });
  };

  render() {
    const { user } = this.props;
    const {
      isEditable,
      loading,
      error,
      ideas,
      upvotedLocalStorage,
      value,
    } = this.state;

    return (
      <Fragment>
        <IdeasHeader>
          <span role="img" aria-label="">
            💡
          </span>{' '}
          Ideas by{' '}
          <a href={`https://twitter.com/${user.username}`}>@{user.username}</a>
        </IdeasHeader>

        {isEditable && (
          <form onSubmit={this.handleSubmit}>
            <IdeaCreator
              placeholder="Your amazing new idea..."
              value={value}
              onChange={this.handleChange}
            />
          </form>
        )}

        {error && (
          <div>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && ideas.length !== 0 && (
          <IdeasList>
            {ideas.map((idea, index) => {
              return (
                <IdeasListItem key={idea._id}>
                  {isEditable && (
                    <IdeasListFront onClick={() => this.deleteIdea(idea._id)}>
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
