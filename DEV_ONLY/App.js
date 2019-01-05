// external dependencies
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

// actions
import {
  localActions,
  sessionActions,
} from '../src';

const createOnClickClearValues = (instance, type) => () => {
  const {clearLocalValues, clearSessionValues} = instance.props;

  const action = type === 'local' ? clearLocalValues : clearSessionValues;

  action();
};

const createOnClickDeleteValue = (instance, type) => (event) => {
  const {deleteLocalValues, deleteSessionValues} = instance.props;

  const key = event.currentTarget.dataset.key;
  const action = type === 'local' ? deleteLocalValues : deleteSessionValues;

  action(key);
};

const createOnClickSetValue = (instance, type) => () => {
  const {setLocalValues, setSessionValues} = instance.props;

  const keyElement = instance[`${type}KeyElement`];
  const valueElement = instance[`${type}ValueElement`];
  const action = type === 'local' ? setLocalValues : setSessionValues;

  action({
    [keyElement.value]: valueElement.value,
  });

  keyElement.value = '';
  valueElement.value = '';

  keyElement.focus();
};

const createSetRef = (instance, name) => (element) => {
  instance[name] = element;
};

const DELETE_BUTTON_STYLE = {
  marginLeft: 5,
};

const SECTION_CONTAINER_STYLE = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const SPACING_STYLE = {
  marginTop: 15,
};

class App extends PureComponent {
  static propTypes = {
    local: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
  };

  // instance values
  localKeyElement = null;
  localValueElement = null;
  sessionKeyElement = null;
  sessionValueElement = null;

  // instance methods
  onClickClearLocalValues = createOnClickClearValues(this, 'local');
  onClickClearSessionValues = createOnClickClearValues(this, 'session');
  onClickDeleteValueInLocal = createOnClickDeleteValue(this, 'local');
  onClickDeleteValueInSession = createOnClickDeleteValue(this, 'session');
  onClickSetValueInLocal = createOnClickSetValue(this, 'local');
  onClickSetValueInSession = createOnClickSetValue(this, 'session');
  setLocalKeyElementRef = createSetRef(this, 'localKeyElement');
  setLocalValueElementRef = createSetRef(this, 'localValueElement');
  setSessionKeyElementRef = createSetRef(this, 'sessionKeyElement');
  setSessionValueElementRef = createSetRef(this, 'sessionValueElement');

  render() {
    const {local, session} = this.props;

    return (
      <div>
        <h1>App</h1>

        <div style={SPACING_STYLE}>
          <button
            onClick={this.onClickClearLocalValues}
            type="button"
          >
            Clear local
          </button>

          <button
            onClick={this.onClickClearSessionValues}
            type="button"
          >
            Clear session
          </button>
        </div>

        <div style={SECTION_CONTAINER_STYLE}>
          <h3>Set in local</h3>

          <div style={SPACING_STYLE}>
            <input
              placeholder="Key"
              ref={this.setLocalKeyElementRef}
            />
          </div>

          <div style={SPACING_STYLE}>
            <input
              placeholder="Value"
              ref={this.setLocalValueElementRef}
            />
          </div>

          <div style={SPACING_STYLE}>
            <button
              onClick={this.onClickSetValueInLocal}
              type="button"
            >
              Set
            </button>
          </div>

          <div style={SPACING_STYLE}>
            {Object.keys(local).map((key) => (
              <div key={key}>
                <b>{key}:</b> {JSON.stringify(local[key])}
                <button
                  data-key={key}
                  onClick={this.onClickDeleteValueInLocal}
                  style={DELETE_BUTTON_STYLE}
                  type="button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={SECTION_CONTAINER_STYLE}>
          <h3>Set in session</h3>

          <div style={SPACING_STYLE}>
            <input
              placeholder="Key"
              ref={this.setSessionKeyElementRef}
            />
          </div>

          <div style={SPACING_STYLE}>
            <input
              placeholder="Value"
              ref={this.setSessionValueElementRef}
            />
          </div>

          <div style={SPACING_STYLE}>
            <button
              onClick={this.onClickSetValueInSession}
              type="button"
            >
              Set
            </button>
          </div>

          <div style={SPACING_STYLE}>
            {Object.keys(session).map((key) => (
              <div key={key}>
                <b>{key}:</b> {JSON.stringify(session[key])}
                <button
                  data-key={key}
                  onClick={this.onClickDeleteValueInSession}
                  style={DELETE_BUTTON_STYLE}
                  type="button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({local, session}) => {
  console.log('local', local);
  console.log('session', session);

  return {
    local,
    session,
  };
};

const mapDispatchToProps = {
  ...localActions,
  ...sessionActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
