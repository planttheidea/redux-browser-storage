// external dependencies
import createConstants from 'namespace-constants';
import createAction from 'redux-actions/lib/createAction';

// constants
import {LOCAL_STORAGE_KEY} from '../constants';

export const ACTION_TYPES = createConstants(LOCAL_STORAGE_KEY, [
  'CLEAR_LOCAL_VALUES',
  'DELETE_LOCAL_VALUES',
  'SET_LOCAL_VALUES',
]);

export const clearLocalValues = createAction(ACTION_TYPES.CLEAR_LOCAL_VALUES);
export const deleteLocalValues = createAction(ACTION_TYPES.DELETE_LOCAL_VALUES);
export const setLocalValues = createAction(ACTION_TYPES.SET_LOCAL_VALUES);
