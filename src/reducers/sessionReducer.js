// external dependencies
import handleActions from 'redux-actions/lib/handleActions';

// actions
import {
  ACTION_TYPES
} from '../actions/sessionActions';

// constants
import {
  SESSION_STORAGE_KEY,
  SESSION_STORAGE_TYPE
} from '../constants';

// utils
import {
  createHandleClearValues,
  createHandleDeleteValues,
  createHandleSetValues
} from '../utils';

export const INITIAL_STATE = {};

export default handleActions({
  [ACTION_TYPES.CLEAR_SESSION_VALUES]: createHandleClearValues(INITIAL_STATE, SESSION_STORAGE_KEY,
    SESSION_STORAGE_TYPE),
  [ACTION_TYPES.DELETE_SESSION_VALUES]: createHandleDeleteValues(SESSION_STORAGE_KEY, SESSION_STORAGE_TYPE),
  [ACTION_TYPES.SET_SESSION_VALUES]: createHandleSetValues(SESSION_STORAGE_KEY, SESSION_STORAGE_TYPE)
}, INITIAL_STATE);
