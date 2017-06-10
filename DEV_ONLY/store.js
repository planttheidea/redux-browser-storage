// external dependencies
import {
  combineReducers,
  createStore
} from 'redux';

// reducers
import {
  localReducer,
  sessionReducer
} from '../src';

const reducers = combineReducers({
  local: localReducer,
  session: sessionReducer
});

export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
