// test
import test from 'ava';
import _ from 'lodash';

// src
import * as index from 'src/index';
import * as actionsExports from 'src/actions';
import * as reducersExports from 'src/reducers';

test('if each actions import has a reflective export', (t) => {
  const {
    __esModule: moduleDeclarationIgnored,
    default: defaultIgnored,
    localActions,
    localReducer: localReducerIgnored,
    sessionActions,
    sessionReducer: sessionReducerIgnored,
    ...actions
  } = actionsExports;

  Object.keys(actions).forEach((key) => {
    t.true(_.isFunction(index[key]));
  });

  Object.keys(localActions).forEach((key) => {
    t.true(_.isFunction(localActions[key]));
  });

  Object.keys(sessionActions).forEach((key) => {
    t.true(_.isFunction(sessionActions[key]));
  });
});

test('if each reducers import has a reflective export', (t) => {
  const {localReducer, sessionReducer} = reducersExports;

  t.is(index.localReducer, localReducer);
  t.is(index.sessionReducer, sessionReducer);
});
