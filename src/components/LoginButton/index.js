import React from 'react';

import { login } from '../../utils/auth';
import { BlueButton } from './styled';

export default function LoginButton() {
  return <BlueButton onClick={login}>Sign in with Twitter</BlueButton>;
}
