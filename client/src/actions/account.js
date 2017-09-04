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

export const login = ({ email, password }) => dispatch => {
  // TODO: Implement loading indicator
  // dispatch(loading());

  return api.login({ email, password })
    .then((response) => {
      dispatch(accountLogin({
        email,
        token: response.headers.Authorization,
      }));
      dispatch(push('/dashboard'));
    })
    .catch((error) => {
    });
};

export const signup = ({ email, password }) => dispatch => {
  // TODO: Implement loading indicator
  //
  return api.signup({ email, password })
    .then((response) => {
      dispatch(accountLogin({
        email,
        token: response.headers.Authorization,
      }));
      dispatch(push('/dashboard'));
    })
    .catch((error) => {
    });
};

