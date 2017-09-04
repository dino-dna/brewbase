import { ACCOUNT_LOGIN, ACCOUNT_LOGOUT } from '../actions/account';

const initialState = {
  email: null,
  token: null,
};

const accountReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACCOUNT_LOGIN:
      return {
        email: payload.email,
        token: payload.token,
      };
    case ACCOUNT_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default accountReducer;
