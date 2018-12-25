import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 30px;
  padding-bottom: 60px;
  text-align: center;
`;

const Description = styled.p`
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 85%;
  text-align: center;
  color: #666;
`;

export default function MakerAds() {
  return (
    <Container>
      <iframe
        title="Product advertisement from maker community"
        style={{ border: 0, width: 320, height: 144 }}
        src="https://makerads.xyz/ad"
      />
      <Description>
        Unobtrusive adverts by{' '}
        <a
          href="https://makerads.xyz/?ref=ideascratch.com"
          target="_blank"
          rel="noopener"
        >
          Makerads
        </a>
      </Description>
    </Container>
  );
}
