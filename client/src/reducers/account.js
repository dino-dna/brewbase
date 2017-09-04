import { LOGIN, LOGOUT } from '../actions/account';

const initialState = {
  email: null,
  token: null,
};

const accountReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case LOGIN:
      return {
        email: payload.email,
        token: payload.token,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default accountReducer;
