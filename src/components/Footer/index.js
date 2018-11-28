import React from 'react';

import {
  FooterContainer,
  CoffeeButton,
  Legal,
  CreatedBy,
  FooterLeft,
} from './styled';

export default function Footer() {
  return (
    <FooterContainer role="contentinfo">
      <FooterLeft>
        <CreatedBy>
          Created by{' '}
          <a href="https://twitter.com/designbykyle">@designbykyle</a> &{' '}
          <a href="https://twitter.com/sunnysinghio">@sunnysinghio</a>
        </CreatedBy>
        <Legal>
          <a href="/terms-of-service">Terms of Service</a>
        </Legal>
      </FooterLeft>
      <div>
        <CoffeeButton
          target="_blank"
          href="https://www.buymeacoffee.com/kylemcd"
          rel="noopener"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
            alt=""
          />
          <div>Buy us a coffee</div>
        </CoffeeButton>
      </div>
    </FooterContainer>
  );
}
