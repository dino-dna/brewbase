import merge from 'lodash/merge';

import {
  ADD_MESSAGE,
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  CLEAR_MESSAGE,
} from '../actions/forms';

const initialState = {
  login: {
    login: '',
    messageText: null,
    messageType: null,
    password: '',
  },
  signup: {
    email: '',
    message: {
      text: null,
      type: null,
    },
    password: '',
  },
};

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return merge({}, state, {
        login: {
          messageText: action.payload.text,
          messageType: action.payload.type,
        },
      });
    case CHANGE_LOGIN:
      return merge({}, state, {
        login: {
          login: action.payload,
        },
      });
    case CHANGE_PASSWORD:
      return merge({}, state, {
        login: {
          password: action.payload,
        },
      });
    case CLEAR_MESSAGE:
      return merge({}, state, {
        login: {
          messageText: null,
          messageType: null,
        },
      });
    default:
      return state;
  }
};

export default formsReducer;
