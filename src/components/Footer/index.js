import React from 'react';
import { Link } from '@reach/router';

import confirmPageLeave from '../../utils/confirmPageLeave';
import {
  FooterContainer,
  CoffeeButton,
  Legal,
  CreatedBy,
  FooterLeft,
} from './styled';

export default function Footer({ showPageLeaveWarning }) {
  return (
    <FooterContainer role="contentinfo">
      <FooterLeft>
        <CreatedBy>
          Created by{' '}
          <a href="https://twitter.com/designbykyle">@designbykyle</a> &{' '}
          <a href="https://twitter.com/sunnysinghio">@sunnysinghio</a>
        </CreatedBy>
        <Legal>
          <Link
            to="/terms-of-service"
            onClick={event => confirmPageLeave(event, showPageLeaveWarning)}
          >
            Terms of Service
          </Link>{' '}
          &nbsp;&nbsp;
          <Link
            to="/privacy-policy"
            onClick={event => confirmPageLeave(event, showPageLeaveWarning)}
          >
            Privacy Policy
          </Link>
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
