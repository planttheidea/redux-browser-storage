# redux-browser-storage

Use redux to manage localStorage and sessionStorage data

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
  * [localActions](#localactions)
    * [clearLocalValues](#clearlocalvalues)
    * [deleteLocalValues](#deletelocalvalues)
    * [setLocalValues](#setlocalvalues)
  * [sessionActions](#sessionactions)
    * [clearSessionValues](#clearsessionvalues)
    * [deleteSessionValues](#deletesessionvalues)
    * [setSessionValues](#setsessionvalues)
  * [localReducer](#localreducer)
  * [sessionReducer](#sessionreducer)
* [Development](#development)

## Installation

```
$ npm i redux-browser-storage --save
```

## Usage

```javascript
// store.js
import {
  combineReducers,
  createStore
} from 'redux';
import {
  localReducer
} from 'redux-browser-storage';

const reducers = combineReducers({
  ...otherReducers,
  local: localReducer // or whatever key you want
});

export default createStore(reducers);

// App.js
import React, {
  PureComponent
} from 'react';
import {
  localActions,
  getLocalStorage
} from 'redux-browser-storage';
import {
  connect
} from 'redux-react';

const mapStateToProps = ({local}) => {
  return {
    local
  };
};

const mapDispatchToProps = {
  ...localActions
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends PureComponent {
  componentWillMount() {
    this.props.setLocalValues({
      foo: 'bar'
    });
  }

  render() {
    const foo = this.props.local.foo; // bar

    return (
      <div>
        {foo}
      </div>
    )
  }
}
```

## API

### localActions

#### clearLocalValues

`clearLocalValues()`

Clears the values in `localStorage` that were stored via `redux-browser-storage`.

```javascript
onClickClear = () => {
  this.props.clearLocalValues();
};
```

#### deleteLocalValues

`deleteLocalValues(keys: (Array<string>|string))`

Deletes the value(s) at the location of `keys` in `localStorage`. Nested values are allowed by use of standard dot or bracket notation.

```javascript
// standard
deleteLocalValues('foo');

// Nested
deleteLocalValues('foo.bar[0].baz');

// multiple
deleteLocalValues(['foo', 'bar[0].baz']);
```

#### setLocalValues

`setLocalValues(values: Object)`

Sets the value(s) in `localStorage` based on the keys of the object passed. Nested values are allowed by use of standard dot or bracket notation.

```javascript
// standard
setLocalValues({
  foo: 'bar'
});

// Nested
setLocalValues({
  'foo.bar[0]': 'baz'
});

// multiple
setLocalvalues({
  foo: 'bar',
  'bar[0]': 'baz'
});
```

### sessionActions

#### clearSessionValues

`clearSessionValues()`

Clears the values in `sessionStorage` that were stored via `redux-browser-storage`.

```javascript
clearSessionValues();
```

#### deleteSessionValues

`deleteSessionValues(keys: (Array<string>|string))`

Deletes the value(s) at the location of `keys` in `sessionStorage`. Nested values are allowed by use of standard dot or bracket notation.

```javascript
// standard
deleteSessionValues('foo');

// Nested
deleteSessionValues('foo.bar[0].baz');

// multiple
deleteSessionValues(['foo', 'bar[0].baz']);
```

#### setSessionValues

`setSessionValues(values: Object)`

Sets the value(s) in `sessionStorage` based on the keys of the object passed. Nested values are allowed by use of standard dot or bracket notation.

```javascript
// standard
setSessionValues({
  foo: 'bar'
});

// Nested
setSessionValues({
  'foo.bar[0]': 'baz'
});

// multiple
setSessionValues({
  foo: 'bar',
  'bar[0]': 'baz'
});
```

### localReducer

Handles storage of items in `localStorage`. This can be assigned to any key you'd like when using `combineReducers`, it is not prescriptive.

```javascript
combineReducers({
  permanentCache: localReducer
});
```

### sessionReducer

Handles storage of items in `sessionStorage`. This can be assigned to any key you'd like when using `combineReducers`, it is not prescriptive.

```javascript
combineReducers({
  temporaryCache: sessionReducer
});
```

## Development

Standard stuff, clone the repo and `npm i` to get the dependencies. npm scripts available:
* `build` => builds the distributed JS with `NODE_ENV=development` and with sourcemaps
* `build:minified` => builds the distributed JS with `NODE_ENV=production` and minified
* `clean` => removes `lib` and `dist` folders
* `dev` => runs the webpack dev server for the playground
* `lint` => runs ESLint against files in the `src` folder
* `lint:fix` => runs ESLint against files in the `src` folder and fixes any fixable issues discovered
* `prepublish` => if in publish, runs `prepublish:compile`
* `prepublish:compile` => runs the `lint`, `test:coverage`, `clean`, `transpile`, `build`, and `build:minified` scripts
* `test` => run `ava` with NODE_ENV=test
* `test:coverage` => run `ava` with `nyc` to calculate code coverage
* `test:watch` => runs `test` but with persistent watcher
* `transpile` => runs Babel against files in `src` to files in `lib`
