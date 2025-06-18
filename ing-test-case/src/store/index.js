import { createStore } from 'redux';
import rootReducer from './reducers.js';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('employeeState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('employeeState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const store = createStore(
  rootReducer,
  loadState()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store; 