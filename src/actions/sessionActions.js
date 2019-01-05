// external dependencies
import createConstants from 'namespace-constants';
import createAction from 'redux-actions/lib/createAction';

// constants
import {SESSION_STORAGE_KEY} from '../constants';

export const ACTION_TYPES = createConstants(SESSION_STORAGE_KEY, [
  'CLEAR_SESSION_VALUES',
  'DELETE_SESSION_VALUES',
  'SET_SESSION_VALUES',
]);

export const clearSessionValues = createAction(ACTION_TYPES.CLEAR_SESSION_VALUES);
export const deleteSessionValues = createAction(ACTION_TYPES.DELETE_SESSION_VALUES);
export const setSessionValues = createAction(ACTION_TYPES.SET_SESSION_VALUES);
