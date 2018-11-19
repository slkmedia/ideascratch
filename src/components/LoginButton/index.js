import React from 'react';

import { login } from '../../utils/auth';
import { LoginButton } from './styled';

export default () => {
  return <LoginButton onClick={login}>Sign in with Twitter</LoginButton>;
};
