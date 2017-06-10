// actions
import {
  clearLocalValues,
  clearSessionValues,
  deleteLocalValues,
  deleteSessionValues,
  localActions,
  sessionActions,
  setLocalValues,
  setSessionValues
} from './actions';

// reducers
import {
  localReducer,
  sessionReducer
} from './reducers';

// utils
import {
  getLocalStorage,
  getSessionStorage
} from './utils';

export {clearLocalValues};
export {clearSessionValues};
export {deleteLocalValues};
export {deleteSessionValues};
export {setLocalValues};
export {setSessionValues};

export {localActions};
export {sessionActions};

export {localReducer};
export {sessionReducer};

export {getLocalStorage};
export {getSessionStorage};

export default {
  clearLocalValues,
  clearSessionValues,
  deleteLocalValues,
  deleteSessionValues,
  getLocalStorage,
  getSessionStorage,
  localActions,
  localReducer,
  sessionActions,
  sessionReducer,
  setLocalValues,
  setSessionValues
};
