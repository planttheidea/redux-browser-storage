// external dependencies
import browserEnv from 'browser-env';

browserEnv();

const createMockStorage = () => {
  let values = {};

  return {
    clear() {
      values = {};
    },
    getItem(key) {
      return values[key];
    },
    setItem(key, value) {
      values[key] = value;
    }
  };
};

window.localStorage = createMockStorage();
window.sessionStorage = createMockStorage();
