import auth0Lib from 'auth0-js';
import history from '../utils/history';

const HOME_ROUTE = '/';

const auth0 = new auth0Lib.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: 'token id_token',
  scope: 'openid',
});

export function login() {
  auth0.authorize({ connection: 'twitter' });
}

export function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0.parseHash((error, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        window.location = HOME_ROUTE;
      } else if (error) {
        history.replace(HOME_ROUTE);
        reject(error);
      }
    });
  });
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  window.location = HOME_ROUTE;
}

export function isAuthenticated() {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}

function setSession(authResult) {
  const expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime(),
  );
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
  history.replace(HOME_ROUTE);
}
