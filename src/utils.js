// external dependencies
import {
  remove,
  set,
} from 'unchanged';

// constants
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_TYPE,
  SESSION_STORAGE_KEY,
  SESSION_STORAGE_TYPE,
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
export const createGetStorage = (storageType, storageKey) => () => {
  try {
    const storageJson = window[storageType].getItem(storageKey);

    return storageJson ? JSON.parse(storageJson) : {};
  } catch (error) {
    return {};
  }
};

/**
 * @function setStateInStorage
 *
 * @description
 * set the newState in the storage type requested
 *
 * @param {string} storageType the type of storage to retrieve
 * @param {string} storageKey the key used in local storage
 * @param {Object} newState the new state value to storewindow
 */
export const setStateInStorage = (storageType, storageKey, newState) =>
  window[storageType].setItem(storageKey, JSON.stringify(newState));

/**
 * @function createHandleClearValues
 *
 * @description
 * create the handler for clearing of values in storage
 *
 * @param {string} storageKey the key used in local storage
 * @param {string} storageType the type of storage to retrieve
 * @returns {function(): Object} the clear values handler
 */
export const createHandleClearValues = (storageKey, storageType) => () => {
  const newState = {};

  setStateInStorage(storageType, storageKey, newState);

  return newState;
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
  const handleDeleteValues = (state, {payload: key}) => {
    if (Array.isArray(key)) {
      return key.reduce((newState, keyToRemove) => handleDeleteValues(newState, {payload: keyToRemove}), state);
    }

    const newState = remove(key, state);

    setStateInStorage(storageType, storageKey, newState);

    return newState;
  };

  return handleDeleteValues;
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
export const createHandleSetValues = (storageKey, storageType) => (state, {payload}) => {
  const newState = Object.keys(payload).reduce((newState, path) => set(path, payload[path], newState), state);

  setStateInStorage(storageType, storageKey, newState);

  return newState;
};

export const getLocalStorage = createGetStorage(LOCAL_STORAGE_TYPE, LOCAL_STORAGE_KEY);
export const getSessionStorage = createGetStorage(SESSION_STORAGE_TYPE, SESSION_STORAGE_KEY);
