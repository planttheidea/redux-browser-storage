// test
import test from 'ava';
import _ from 'lodash';
import sinon from 'sinon';

// src
import * as utils from 'src/utils';
import * as constants from 'src/constants';

test('if createGetStorage will return the value in state if the key exists', (t) => {
  const object = {
    foo: 'bar'
  };
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const getStorage = utils.createGetStorage(storageType, storageKey);

  t.true(_.isFunction(getStorage));

  const stub = sinon.stub(window[storageType], 'getItem').returns(JSON.stringify(object));

  const result = getStorage();

  t.true(stub.calledOnce);
  t.true(stub.calledWith(storageKey));

  t.deepEqual(result, object);

  stub.restore();
});

test('if createGetStorage will return an empty object if the key does not exist', (t) => {
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const getStorage = utils.createGetStorage(storageType, storageKey);

  t.true(_.isFunction(getStorage));

  const stub = sinon.stub(window[storageType], 'getItem').returns(null);

  const result = getStorage();

  t.true(stub.calledOnce);
  t.true(stub.calledWith(storageKey));

  t.deepEqual(result, {});

  stub.restore();
});

test('if createGetStorage will return an empty object if parsing the result throws an error', (t) => {
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const getStorage = utils.createGetStorage(storageType, storageKey);

  t.true(_.isFunction(getStorage));

  const stub = sinon.stub(window[storageType], 'getItem').returns({});

  const result = getStorage();

  t.true(stub.calledOnce);
  t.true(stub.calledWith(storageKey));

  t.deepEqual(result, {});

  stub.restore();
});

test('if setStateInStorage will set the state in the storage specified', (t) => {
  const object = {
    foo: 'bar'
  };
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const stub = sinon.stub(window[storageType], 'setItem');

  utils.setStateInStorage(storageType, storageKey, object);

  t.true(stub.calledOnce);

  const args = stub.firstCall.args;

  t.is(args.length, 2);

  const [
    key,
    value
  ] = args;

  t.is(key, storageKey);
  t.is(value, JSON.stringify(object));

  stub.restore();
});

test('if createHandleClearValues will set the initial state passed both in the reducer and in storage', (t) => {
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const handleClearValues = utils.createHandleClearValues(storageKey, storageType);

  t.true(_.isFunction(handleClearValues));

  const stub = sinon.stub(window[storageType], 'setItem');

  const result = handleClearValues();

  t.true(stub.called);

  const args = stub.firstCall.args;

  t.is(args.length, 2);

  const [
    key,
    value
  ] = args;

  t.is(key, storageKey);
  t.is(value, JSON.stringify({}));

  t.deepEqual(result, {});

  stub.restore();
});

test('if createHandleDeleteValues creates a reducer that will remove the key from the state passed and return it', (t) => {
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const handleDeleteValues = utils.createHandleDeleteValues(storageKey, storageType);

  t.true(_.isFunction(handleDeleteValues));

  const currentState = {
    foo: {
      bar: 'baz'
    }
  };
  const action = {
    payload: 'foo.bar'
  };

  const stub = sinon.stub(window[storageType], 'setItem');

  const result = handleDeleteValues(currentState, action);
  const expectedResult = {
    foo: {}
  };

  t.true(stub.calledOnce);

  const args = stub.firstCall.args;

  t.is(args.length, 2);
  t.deepEqual(args, [
    storageKey,
    JSON.stringify(expectedResult)
  ]);

  stub.restore();

  t.deepEqual(result, expectedResult);
});

test('if createHandleDeleteValues creates a reducer that will remove the keys from the state passed and return it', (t) => {
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const handleDeleteValues = utils.createHandleDeleteValues(storageKey, storageType);

  t.true(_.isFunction(handleDeleteValues));

  const currentState = {
    foo: 'foo',
    bar: 'bar'
  };
  const action = {
    payload: ['foo', 'bar']
  };

  const stub = sinon.stub(window[storageType], 'setItem');

  const result = handleDeleteValues(currentState, action);
  const expectedResult = {};

  t.true(stub.calledOnce);

  const args = stub.firstCall.args;

  t.is(args.length, 2);
  t.deepEqual(args, [
    storageKey,
    JSON.stringify(expectedResult)
  ]);

  stub.restore();

  t.deepEqual(result, expectedResult);
});

test('if createHandleSetValues creates a reducer that will add the items in state passed and return it', (t) => {
  const storageKey = constants.LOCAL_STORAGE_KEY;
  const storageType = constants.LOCAL_STORAGE_TYPE;

  const handlSetValues = utils.createHandleSetValues(storageKey, storageType);

  t.true(_.isFunction(handlSetValues));

  const currentState = {
    foo: 'foo'
  };
  const action = {
    payload: {
      bar: 'bar'
    }
  };

  const stub = sinon.stub(window[storageType], 'setItem');

  const result = handlSetValues(currentState, action);
  const expectedResult = {
    ...currentState,
    ...action.payload
  };

  t.true(stub.calledOnce);

  const args = stub.firstCall.args;

  t.is(args.length, 2);
  t.deepEqual(args, [
    storageKey,
    JSON.stringify(expectedResult)
  ]);

  stub.restore();

  t.deepEqual(result, expectedResult);
});
