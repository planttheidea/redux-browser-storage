// test
import test from 'ava';
import _ from 'lodash';

// src
import * as actions from 'src/actions/index';
import * as localActionsExports from 'src/actions/localActions';
import * as sessionActionsExports from 'src/actions/sessionActions';

test('if every localActions import that is an action has a corresponding export', (t) => {
  const {__esModule: moduleDeclarationIgnored, ACTION_TYPES: actionTypesIgnored, ...localActions} = localActionsExports;

  Object.keys(localActions).forEach((key) => {
    t.true(_.isFunction(actions[key]));
  });
});

test('if every sessionActions import that is an action has a corresponding export', (t) => {
  const {
    __esModule: moduleDeclarationIgnored,
    ACTION_TYPES: actionTypesIgnored,
    ...sessionActions
  } = sessionActionsExports;

  Object.keys(sessionActions).forEach((key) => {
    t.true(_.isFunction(actions[key]));
  });
});

test('if the default export has all the actions namespaced', (t) => {
  const {
    __esModule: localModuleDeclarationIgnored,
    ACTION_TYPES: localActionTypesIgnored,
    ...localActions
  } = localActionsExports;
  const {
    __esModule: sessionModuleDeclarationIgnored,
    ACTION_TYPES: sessionActionTypesIgnored,
    ...sessionActions
  } = sessionActionsExports;

  t.deepEqual(actions.default, {
    localActions,
    sessionActions,
  });
});
