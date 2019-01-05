// test
import test from 'ava';

// src
import reducer, {INITIAL_STATE} from 'src/reducers/sessionReducer';

test('if INITIAL_STATE is returned when no matching actions are found', (t) => {
  const result = reducer(undefined, {});

  t.is(result, INITIAL_STATE);
});
