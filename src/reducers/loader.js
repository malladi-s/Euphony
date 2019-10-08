const initialState = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT_LOADER': {
      return state + 1;
    }
    case 'DECREMENT_LOADER': {
      // Don't go lower than zero
      return Math.max(state - 1, 0);
    }
    default: {
      return state;
    }
  }
}