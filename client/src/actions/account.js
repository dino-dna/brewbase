export const LOGIN = 'LOGIN';

export const login = ({ email, token }) => ({
  payload: { email, token },
  type: LOGIN,
});

export const LOGOUT = 'LOGOUT';

export const logout = () => ({
  type: LOGOUT,
});

