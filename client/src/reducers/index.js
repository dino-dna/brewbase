import { combineReducers } from 'redux';

import account from './account';
import forms from './forms';

const rootReducer = combineReducers({
  account,
  forms,
});

export default rootReducer;
