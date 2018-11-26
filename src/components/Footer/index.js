import React from 'react';

import { 
  Footer,
  CoffeeButton
} from './styled';

export default () => {
  return (
    <Footer>
      Created by <a href="https://twitter.com/designbykyle">@designbykyle</a> &{' '}
      <a href="https://twitter.com/sunnysinghio">@sunnysinghio</a>
      <div>
      <CoffeeButton class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/kylemcd">
        <img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"/>
        <div>Buy us a coffee</div>
      </CoffeeButton>
      </div>
    </Footer>
  );
};
