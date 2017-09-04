import merge from 'lodash/merge';

import {
  ADD_MESSAGE,
  CHANGE_FIELD,
  CLEAR_MESSAGE,
} from '../actions/forms';

const initialState = {
  login: {
    email: '',
    message: {
      text: null,
      type: null,
    },
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

/**
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} Modified state
 */
const formsReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_MESSAGE:
      return merge({}, state, {
        [payload.form]: {
          message: payload.message,
        },
      });
    case CHANGE_FIELD:
      return merge({}, state, {
        [payload.form]: {
          [payload.field]: payload.value,
        },
      });
    case CLEAR_MESSAGE:
      return merge({}, state, {
        [payload.form]: {
          message: {
            text: null,
            type: null,
          },
        },
      });
    default:
      return state;
  }
};

export default formsReducer;
