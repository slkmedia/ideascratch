import React, { Component, Fragment } from 'react';

import {
  IdeasList,
  IdeasListItem,
  IdeasListContainer,
  IdeasListFront,
  IdeasHeader,
  IdeaCreator,
  IdeaUpvote
} from './styled';

export default class Ideas extends Component {

  state = {
    authenticated: true,
    loading: true,
    ideas: [],
    ideasUpvoted: [],
    upvotedLocalStorage: window.localStorage.getItem('upvoted') || null
  }

  componentWillMount(){
    fetch('/.netlify/functions/getIdeas')
      .then(response => response.json())
      .then((json) => {
        this.setState({ ideas: json.msg, loading: false });

        [...json.msg].forEach((item) => {
          this.state.ideasUpvoted.push(false);
        });
      });

      // Initiate local storage item if not already created
      if(this.state.upvotedLocalStorage === null){
        window.localStorage.setItem('upvoted', '');
        this.setState({
          upvotedLocalStorage: window.localStorage.getItem('upvoted')
        });
      }
  }

  upvote = (ideas, idx) => {
    return() => { 

        let ideasUpvoted = this.state.ideasUpvoted;
        let upvotedLocalArr = this.state.upvotedLocalStorage.split(',');
      
        if(ideasUpvoted[idx] === false  && !upvotedLocalArr.includes(ideas[idx]._id)){
          let tempStorage = null;
          ideas[idx].upvotes++; 
          ideasUpvoted[idx] = true;

          if(this.state.upvotedLocalStorage.length > 0){
            tempStorage = this.state.upvotedLocalStorage + ',' + ideas[idx]._id;
            this.setState({
              upvotedLocalStorage: this.state.upvotedLocalStorage + ',' + ideas[idx]._id
            });
          } else {
            tempStorage = ideas[idx]._id;
            this.setState({
              upvotedLocalStorage: ideas[idx]._id
            });
          }

          window.localStorage.setItem('upvoted', tempStorage);

          this.setState({
            ideas: ideas,
            ideasUpvoted: ideasUpvoted
          });
          
        } else {
          console.log('You already upvoted this')
        }


    }
  }

  render(){
    const { authenticated, loading, ideas, upvotedLocalStorage } = this.state;
    return (
      <Fragment>
        <IdeasHeader>
          💡 Ideas by <a href="#">@johnsmith</a>
        </IdeasHeader>
        {
          authenticated &&
          <IdeaCreator placeholder="Your amazing new idea..."/>
        }
        {
          !loading &&
          <IdeasList>
          {
            ideas.map((d, idx) => {
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
                    <IdeaUpvote onClick={this.upvote(ideas, idx)} active={upvotedLocalStorage.includes(d._id)}>
                      <span>{d.upvotes}</span>
                    </IdeaUpvote>
                  </IdeasListContainer>
                </IdeasListItem>
              )
            })
          }
          </IdeasList>
        }
      </Fragment>
    )
  }
}