import api from '../services/api';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const CHANGE_FIELD = 'CHANGE_FIELD';

export const changeField = (form, field, value) => ({
  payload: {
    form,
    field,
    value,
  },
  type: CHANGE_FIELD,
});

export const addMessage = (form, { text, type }) => ({
  payload: {
    form,
    message: { text, type },
  },
  type: ADD_MESSAGE,
});

export const clearMessage = form => ({
  payload: { form },
  type: CLEAR_MESSAGE,
});

export const SUBMIT_START = 'SUBMIT_START';
export const SUBMIT_END = 'SUBMIT_END';

export const submit = form => (dispatch, getState) => {
  dispatch({
    type: SUBMIT_START,
  });

  const { forms: formsState } = getState();

  const payload = {
    login: formsState[form].email,
    password: formsState[form].password,
  };

  const method = form === 'signup' ?
    api.signup :
    api.login;

  return method(payload)
    .then((response) => {
      dispatch({
        type: SUBMIT_END,
      });
      dispatch(addMessage(form, {
        text: response.toString(),
        type: 'success',
      }));
    })
    .catch((error) => {
      dispatch({
        type: SUBMIT_END,
      });
      dispatch(addMessage(form, {
        text: error.message,
        type: 'error',
      }));
    });
};

