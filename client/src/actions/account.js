import { push } from 'react-router-redux';

import api from '../services/api';

export const ACCOUNT_LOGIN = 'ACCOUNT_LOGIN';

export const accountLogin = ({ email, token }) => ({
  payload: { email, token },
  type: ACCOUNT_LOGIN,
});

export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT';

export const accountLogout = () => ({
  type: ACCOUNT_LOGOUT,
});

// TODO: Move to middleware
// TODO: Implement loading indicator
export const login = ({ email, password }) => dispatch =>
  api.login({ email, password })
    .then((response) => {
      dispatch(accountLogin({
        email,
        token: response.headers.Authorization,
      }));
      dispatch(push('/dashboard'));
      return response;
    });

// TODO: Move to middleware
// TODO: Implement loading indicator
export const signup = ({ email, password }) => dispatch =>
  api.signup({ email, password })
    .then((response) => {
      dispatch(accountLogin({
        email,
        token: response.headers.Authorization,
      }));
      dispatch(push('/dashboard'));
      return response;
    });

