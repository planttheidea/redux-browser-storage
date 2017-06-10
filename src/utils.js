// external dependencies
import omit from 'kari/omit';
import set from 'kari/set';

// constants
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_TYPE,
  SESSION_STORAGE_KEY,
  SESSION_STORAGE_TYPE
} from './constants';

/**
 * @function createGetStorage
 *
 * @description
 * create a method that will retrieve the storage type requested
 *
 * @param {string} storageType the type of storage to retrieve
 * @param {string} storageKey the key used in local storage
 * @returns {function(): Object} the method that will retrieve the value in storage
 */
export const createGetStorage = (storageType, storageKey) => {
  return () => {
    const storage = window[storageType].getItem(storageKey);

    return storage ? JSON.parse(storage) : {};
  };
};

/**
 * @function setStateInStorage
 *
 * @description
 * set the newState in the storage type requested
 *
 * @param {string} storageType the type of storage to retrieve
 * @param {string} storageKey the key used in local storage
 * @param {Object} newState the new state value to store
 */
export const setStateInStorage = (storageType, storageKey, newState) => {
  window[storageType].setItem(storageKey, JSON.stringify(newState));
};

/**
 * @function createHandleClearValues
 *
 * @description
 * create the handler for clearing of values in storage
 *
 * @param {Object} initialState the initial state to revert to
 * @param {string} storageKey the key used in local storage
 * @param {string} storageType the type of storage to retrieve
 * @returns {function(): Object} the clear values handler
 */
export const createHandleClearValues = (initialState, storageKey, storageType) => {
  return () => {
    const newState = {
      ...initialState
    };

    setStateInStorage(storageType, storageKey, newState);

    return newState;
  };
};

/**
 * @function createHandleDeleteValues
 *
 * @description
 * create the handler for deleting specific keys in state
 *
 * @param {string} storageKey the key used in local storage
 * @param {string} storageType the type of storage to retrieve
 * @returns {function(): Object} the delete values handler
 */
export const createHandleDeleteValues = (storageKey, storageType) => {
  return (state, {payload}) => {
    const keys = Array.isArray(payload) ? payload : [payload];
    const newState = keys.reduce((newState, path) => {
      return omit(path, newState);
    }, state);

    setStateInStorage(storageType, storageKey, newState);

    return newState;
  };
};

/**
 * @function createHandleSetValues
 *
 * @description
 * create the handler for setting specific keys in state
 *
 * @param {string} storageKey the key used in local storage
 * @param {string} storageType the type of storage to retrieve
 * @returns {function(): Object} the set values handler
 */
export const createHandleSetValues = (storageKey, storageType) => {
  return (state, {payload}) => {
    const newState = Object.keys(payload).reduce((newState, path) => {
      return set(path, payload[path], newState);
    }, state);

    setStateInStorage(storageType, storageKey, newState);

    return newState;
  };
};

export const getLocalStorage = createGetStorage(LOCAL_STORAGE_TYPE, LOCAL_STORAGE_KEY);
export const getSessionStorage = createGetStorage(SESSION_STORAGE_TYPE, SESSION_STORAGE_KEY);
