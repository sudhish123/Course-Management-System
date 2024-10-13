
import { createStore } from 'redux';

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
