/* =============================== REDUX IMPLEMENTATION ================================ */
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
/** ============================================================================================= */
/** ====================== Create reducers and action creators =================================== */
// Reducers
function todoReducer(state = [], action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.todo];
    case "REMOVE":
      return state.filter(todo => todo.id !== action.id);
    case "TOGGLE":
      return state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

function goalsReducer(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return [...state, action.goal];
    case "REMOVE_GOAL":
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

function rootReducer(state = {}, action) {
  return {
    todos: todoReducer(state.todos, action),
    goals: goalsReducer(state.goals, action)
  };
}

const addAction = payload => ({
  type: "ADD",
  todo: payload
});
const removeAction = id => ({
  type: "REMOVE",
  id
});
const toggleAction = id => ({
  type: "TOGGLE",
  id
});
const addGoalAction = payload => ({
  type: "ADD_GOAL",
  goal: payload
});

/** ========================================================= */
// Run this
const store = createStore(rootReducer);
store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});
store.dispatch(addAction({ id: 0, name: "Implement Redux", completed: false }));
store.dispatch(addAction({ id: 1, name: "Learn TS", completed: false }));
store.dispatch(addAction({ id: 2, name: "Learn Reason", completed: false }));
store.dispatch(toggleAction(0));
store.dispatch(
  addGoalAction({ id: 0, name: "Land a cool gig", completed: false })
);
