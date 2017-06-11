// external dependencies
import handleActions from 'redux-actions/lib/handleActions';

// actions
import {
  ACTION_TYPES
} from '../actions/localActions';

// constants
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_TYPE
} from '../constants';

// utils
import {
  createHandleClearValues,
  createHandleDeleteValues,
  createHandleSetValues,
  getLocalStorage
} from '../utils';

export const INITIAL_STATE = getLocalStorage();

export default handleActions({
  [ACTION_TYPES.CLEAR_LOCAL_VALUES]: createHandleClearValues(LOCAL_STORAGE_KEY, LOCAL_STORAGE_TYPE),
  [ACTION_TYPES.DELETE_LOCAL_VALUES]: createHandleDeleteValues(LOCAL_STORAGE_KEY, LOCAL_STORAGE_TYPE),
  [ACTION_TYPES.SET_LOCAL_VALUES]: createHandleSetValues(LOCAL_STORAGE_KEY, LOCAL_STORAGE_TYPE)
}, INITIAL_STATE);
