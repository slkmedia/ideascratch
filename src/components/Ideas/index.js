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
  IdeasSubTitle
} from './styled';

let isSaving = false; // track requests being saved to show page leave confirm

const sortIdeas = (a, b) => {
  if (a.upvotes > b.upvotes) return -1;
  if (a.upvotes < b.upvotes) return 1;
  return -1;
};

export default class Ideas extends Component {
  state = {
    isEditable: false,
    loading: true,
    error: null,
    ideas: [],
    allIdeas: [],
    ideasUpvoted: [],
    upvotedLocalStorage: window.localStorage.getItem('upvoted') || '',
    value: '',
    shippedIdeas: []
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

  async getShippedIdeas(ideas){
    let shippedIdeas = []  ;
    [...ideas].forEach((idea) => {
      if(idea.shipped){
        shippedIdeas.push(idea)
      }
    })

    this.setState({
      shippedIdeas
    })
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    isSaving = false;
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

    let ideas; 

    const allIdeas = (await response.json().catch(error => {}).then(((unfilteredIdeas) => { 
      
      this.getShippedIdeas(unfilteredIdeas)

      ideas = unfilteredIdeas.filter(idea => !idea.shipped) || [];

    }))) || [];

    const newIdeasUpvoted = [...ideas].map(() => false);

    this.setState({
      loading: false,
      error: null,
      ideas: ideas.sort(sortIdeas),
      allIdeas,
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
        ideas,
        ideasUpvoted: ideasUpvoted,
      });
    }
  };

  deleteIdea = (id, idea) => {
    if (!id) {
      alert(
        'This idea is still being saved, please wait a moment before deleting.',
      );
      return;
    }

    if(!idea.shipped){
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

      const indexToRemove = this.getItem(id, false);

      this.setState({
        ideas: [
          ...this.state.ideas.slice(0, indexToRemove),
          ...this.state.ideas.slice(indexToRemove + 1),
        ],
      });
    } else {
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

      const indexToRemove = this.getItem(id, true);

      this.setState({
        ideas: [
          ...this.state.shippedIdeas.slice(0, indexToRemove),
          ...this.state.shippedIdeas.slice(indexToRemove + 1),
        ],
      });
    }
  };

  getItem(id, shipped) {
    let item;
    if(shipped){
      [...this.state.shippedIdeas].forEach((idea, index) => {
        if (idea._id === id) {
          item = index;
        }
      });
    } else {
      [...this.state.ideas].forEach((idea, index) => {
        if (idea._id === id) {
          item = index;
        }
      });
    }
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
    const createdIndex = this.state.ideas.length;

    this.setState(state => ({
      ideas: [
        { name: state.value, upvotes: 0, userId: user.id },
        ...state.ideas,
      ].sort(sortIdeas),
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
    }).then(async response => {
      isSaving = false;
      this.props.updateSaving(false);

      const createdIdea = await response.json();
      this.setState(state => ({
        ideas: state.ideas
          .map((idea, index) => (index === createdIndex ? createdIdea : idea))
          .sort(sortIdeas),
      }));
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
      shippedIdeas
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
          <Fragment>
            <IdeasSubTitle>On Deck <span role="img">🎯</span></IdeasSubTitle>
            <IdeasList>
              {ideas.map((idea, index) => {
                return (
                  <IdeasListItem key={idea._id || idea.name}>
                    {isEditable && (
                      <Fragment>
                        <IdeasListFront onClick={() => this.deleteIdea(idea._id, idea)}>
                          <span role="img" aria-label="Delete Idea">
                            🗑
                          </span>
                        </IdeasListFront>
                        <IdeasListFront>
                          <span role="img" aria-label="Ship Idea">
                            🚀
                          </span>
                        </IdeasListFront>
                      </Fragment>
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
          </Fragment>
        ) : !loading ? (
          <IdeasNoneContainer>
            No ideas here{' '}
            <span role="img" aria-label="thinking emoji">
              🤔
            </span>
          </IdeasNoneContainer>
        ) : null}
             
        {!loading && shippedIdeas.length !== 0 && 
            <Fragment>
            <IdeasSubTitle>Shipped <span role="img">🚀</span></IdeasSubTitle>
              <IdeasList>
              {shippedIdeas.map((idea, index) => {
                return (
                <IdeasListItem key={idea._id || idea.name}>
                  {isEditable && (
                    <IdeasListFront onClick={() => this.deleteIdea(idea._id, idea)}>
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
                )
              })}
              </IdeasList>
             </Fragment>
          }
      </Fragment>
    );
  }
}
