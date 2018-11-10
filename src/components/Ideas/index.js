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
    ideasUpvoted: []
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

      if(window.localStorage.getItem('upvoted') === null){
        console.log('tests')
        window.localStorage.setItem('upvoted', '');
      }
  }

  upvote = (ideas, idx) => {
    return() => { 

        let ideasUpvoted = this.state.ideasUpvoted;
        let upvotedLocal = window.localStorage.getItem('upvoted');

        let upvotedLocalArr = upvotedLocal.split(',') || '';
      

        if(ideasUpvoted[idx] === false  && !upvotedLocalArr.includes(ideas[idx]._id)){
          ideas[idx].upvotes++; 
          ideasUpvoted[idx] = true;


          if(upvotedLocal.length > 0){
            upvotedLocal = upvotedLocal + ',' + ideas[idx]._id;
          } else {
            upvotedLocal = ideas[idx]._id;
          }

          window.localStorage.setItem('upvoted', upvotedLocal);

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
                    <IdeaUpvote onClick={this.upvote(ideas, idx)}>
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