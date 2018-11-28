import auth0Lib from 'auth0-js';
import history from '../utils/history';

const HOME_ROUTE = '/';

const auth0 = new auth0Lib.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: 'token id_token',
  scope: 'openid profile',
});

export function login() {
  auth0.authorize({ connection: 'twitter' });
}

export async function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0.parseHash(async (error, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        console.log('AUTH RESULT', authResult);
        try {
          window.location = `/${(await getProfile()).nickname}`;
        } catch (error) {
          window.location = HOME_ROUTE;
        }
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

export function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) throw new Error('No Access Token found');
  return accessToken;
}

export function isAuthenticated() {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}

export async function getProfile() {
  const accessToken = getAccessToken();
  return new Promise((resolve, reject) => {
    auth0.client.userInfo(accessToken, (error, userInfo) => {
      if (error) reject(new Error(error.original));
      resolve(userInfo);
    });
  });
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
