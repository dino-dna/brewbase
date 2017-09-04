import { combineReducers } from 'redux';
import {
  routerReducer as router,
} from 'react-router-redux';

import account from './account';
import forms from './forms';

const rootReducer = combineReducers({
  account,
  forms,
  router,
});

export default rootReducer;
