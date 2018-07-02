function createStore(reducer) {
  /* The store should have 4 parts:  */
  // 1. Create the state
  let state;

  // 2. Get the state
  const getState = () => state;

  // 3. Subscribe to the state changes
  let listeneres = [];
  const subscribe = listener => {
    // Push provided listener to array
    listeneres.push(listener);
    // Returns unsubscribe function to remove provided listener from array
    // Ex.: this.unsubscribe = store.subscribe(() => {})
    return () => {
      listeneres = listeneres.filter(l => l !== listener);
    };
  };

  // 4. Update the State
  const dispatch = action => {
    // call reducer to update current state
    state = reducer(state, action);
    // loop over listeneres and invoke them
    listeneres.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

/** Helper reducer and action creator */
const addAction = () => ({
  type: 'ADD',
  todo: {
    id: 0,
    name: 'Read',
    complete: false
  }
});

// Reducer
function todoReducer(state = [], action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.todo];
      break;
    default:
      return state;
  }
}
