import api from '../services/api';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';


export const changeLogin = login => ({
  payload: login,
  type: CHANGE_LOGIN,
});

export const changePassword = password => ({
  payload: password,
  type: CHANGE_PASSWORD,
});

export const addMessage = ({ text, type }) => ({
  payload: { text, type },
  type: ADD_MESSAGE,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const SUBMIT_START = 'SUBMIT_START';
export const SUBMIT_END = 'SUBMIT_END';

export const submit = () => (dispatch, getState) => {
  dispatch({
    type: SUBMIT_START,
  });

  const {
    forms: {
      login: { login, password },
    },
  } = getState();

  return api.login({ login, password })
    .then((response) => {
      dispatch({
        type: SUBMIT_END,
      });
      dispatch(addMessage({
        text: response.toString(),
        type: 'success',
      }));
    })
    .catch((error) => {
      dispatch({
        type: SUBMIT_END,
      });
      dispatch(addMessage({
        text: error.message,
        type: 'error',
      }));
    });
};

