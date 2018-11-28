import React from 'react';

import {
  User404Container,
  User404Heading,
  User404Tweet,
  User404TweetContainer,
} from './styled';

export default function User404({ username }) {
  return (
    <User404Container>
      <User404Heading>
        <a href={`https://twitter.com/${username}`}>{username}</a> hasn't made
        an account yet, <br /> let them know they should!
      </User404Heading>
      <User404TweetContainer>
        <User404Tweet
          href={`https://twitter.com/intent/tweet?text=Hey%20@${username}%20you%20should%20create%20an%20account%20on%20https://ideascratch.com`}
          target="_blank"
          rel="noopener"
        >
          Tweet @{username}
        </User404Tweet>
      </User404TweetContainer>
    </User404Container>
  );
}
