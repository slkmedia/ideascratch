import React from 'react';
import { handleAuthentication } from '../../utils/auth';

const handleCallback = async url => {
  if (/access_token|id_token|error/.test(url)) {
    await handleAuthentication();
  }
};

export default function CallbackPage({ location }) {
  handleCallback(location.href);
  return (
    <div style={{ padding: 60, textAlign: 'center' }}>
      <strong>Signing in please wait...</strong>
    </div>
  );
}
