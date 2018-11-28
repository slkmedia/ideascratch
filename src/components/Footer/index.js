import React from 'react';
import { Link } from '@reach/router'

import { 
  Footer,
  CoffeeButton,
  Legal,
  CreatedBy,
  FooterLeft
} from './styled';

export default () => {
  return (
    <Footer>
      <FooterLeft>
        <CreatedBy>
          Created by <a href="https://twitter.com/designbykyle">@designbykyle</a> &{' '}
          <a href="https://twitter.com/sunnysinghio">@sunnysinghio</a>
        </CreatedBy>
        <Legal>
          <Link to="/terms-of-service">Terms of Service</Link> &nbsp;&nbsp;
          <Link to="/privacy-policy">Privacy Policy</Link>
        </Legal>
      </FooterLeft>
      <div>
        <CoffeeButton target="_blank" href="https://www.buymeacoffee.com/kylemcd">
          <img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"/>
          <div>Buy us a coffee</div>
        </CoffeeButton>
      </div>
    </Footer>
  );
};
