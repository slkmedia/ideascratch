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
  
  constructor(props){
    super(props);

    this.state = {
      authenticated: true,
      loading: true,
      ideas: [],
      ideasUpvoted: [],
      upvotedLocalStorage: window.localStorage.getItem('upvoted') || null,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount() {
    fetch('/.netlify/functions/getIdeas')
      .then(response => { 
        if (!response.ok) { throw response }
        return response.json()
      })
      .then(json => {
        console.log(json)
        const newIdeasUpvoted = [...json.msg].map(() => false);
        this.setState({
          ideas: json.msg,
          loading: false,
          ideasUpvoted: [...this.state.ideasUpvoted, ...newIdeasUpvoted],
        });
      }).catch(err => {
        console.log(err)
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

      fetch('/.netlify/functions/upvote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ideas[index]._id
        })
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

  handleChange(event){
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    
    fetch('/.netlify/functions/createIdea', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idea: this.state.value
      })
    })
  }

  render() {
    const { authenticated, loading, ideas, upvotedLocalStorage, value } = this.state;
    return (
      <Fragment>
        <IdeasHeader>
          <span role="img" aria-label="">
            💡
          </span>{' '}
          Ideas by <a href="/johnsmith">@johnsmith</a>
        </IdeasHeader>

        {authenticated && (
          <form onSubmit={this.handleSubmit}>
            <IdeaCreator placeholder="Your amazing new idea..." value={value} onChange={this.handleChange}/>
          </form>
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
