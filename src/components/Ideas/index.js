import React, { Component, Fragment } from 'react';

import { AccessibleText, AccessibleLabel } from '../ScreenReader';
import {
  IdeasList,
  IdeasListItem,
  IdeasListContainer,
  IdeasListFront,
  IdeasHeader,
  IdeaCreator,
  IdeaUpvote,
  IdeasNoneContainer,
} from './styled';

let isSaving = false; // track requests being saved to show page leave confirm

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

    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    this.props.updateSaving(false);
  }

  handleBeforeUnload(event) {
    if (isSaving) {
      event.preventDefault();
      event.returnValue =
        'A request is still processing. Leaving may cause lost changes.';
    }
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

    const ideas = (await response.json().catch(error => {})) || [];
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

    if (!ideas[index]._id) {
      alert(
        'This idea is still being saved, please wait a moment before upvoting.',
      );
      return;
    }

    if (
      ideasUpvoted[index] === false &&
      !upvotedLocalArr.includes(ideas[index]._id)
    ) {
      isSaving = true;
      this.props.updateSaving(true);
      fetch('/.netlify/functions/upvote', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ideas[index]._id,
        }),
      }).then(() => {
        isSaving = false;
        this.props.updateSaving(false);
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
    }
  };

  deleteIdea = id => {
    if (!id) {
      alert(
        'This idea is still being saved, please wait a moment before deleting.',
      );
      return;
    }

    isSaving = true;
    this.props.updateSaving(true);
    fetch('/.netlify/functions/deleteIdea', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }).then(() => {
      isSaving = false;
      this.props.updateSaving(false);
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

    this.setState(state => ({
      ideas: [
        ...state.ideas,
        { name: state.value, upvotes: 0, userId: user.id },
      ],
    }));

    isSaving = true;
    this.props.updateSaving(true);
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
      isSaving = false;
      this.props.updateSaving(false);
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
            <AccessibleLabel htmlFor="idea">
              Your amazing new idea...
            </AccessibleLabel>
            <IdeaCreator
              type="text"
              id="idea"
              placeholder="Your amazing new idea..."
              value={value}
              onChange={this.handleChange}
            />
            <AccessibleText>
              <button type="submit">Save</button>
            </AccessibleText>
          </form>
        )}

        {error && (
          <div>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && ideas.length !== 0 ? (
          <IdeasList>
            {ideas.map((idea, index) => {
              return (
                <IdeasListItem key={idea._id || idea.name}>
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
        ) : !loading ? (
          <IdeasNoneContainer>
            No ideas here{' '}
            <span role="img" aria-label="thinking emoji">
              🤔
            </span>
          </IdeasNoneContainer>
        ) : null}
      </Fragment>
    );
  }
}
