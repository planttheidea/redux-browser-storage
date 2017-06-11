// test
import test from 'ava';
import _ from 'lodash';

// src
import * as actions from 'src/actions/localActions';

test('if every constant has a corresponding camelCase action', (t) => {
  Object.keys(actions.ACTION_TYPES).forEach((key) => {
    t.true(_.isFunction(actions[_.camelCase(key)]));
  });
});
