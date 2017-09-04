import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      store.replaceReducer(require('../reducers').default);
      /* eslint-enable global-require */
    });
  }

  return store;
};

export default configureStore;
