// actions
import {
  clearLocalValues,
  deleteLocalValues,
  setLocalValues
} from './localActions';
import {
  clearSessionValues,
  deleteSessionValues,
  setSessionValues
} from './sessionActions';

export {clearLocalValues};
export {deleteLocalValues};
export {setLocalValues};

const localActions = {
  clearLocalValues,
  deleteLocalValues,
  setLocalValues
};

export {localActions};

export {clearSessionValues};
export {deleteSessionValues};
export {setSessionValues};

const sessionActions = {
  clearSessionValues,
  deleteSessionValues,
  setSessionValues
};

export {sessionActions};

export default {
  localActions,
  sessionActions
};
