// test
import test from 'ava';

// src
import * as reducers from 'src/reducers/index';
import localReducer from 'src/reducers/localReducer';
import sessionReducer from 'src/reducers/sessionReducer';

test('if all reducers have a corresponding export', (t) => {
  t.is(reducers.localReducer, localReducer);
  t.is(reducers.sessionReducer, sessionReducer);
});

test('if the default export has all the reducers', (t) => {
  t.deepEqual(reducers.default, {
    localReducer,
    sessionReducer,
  });
});
