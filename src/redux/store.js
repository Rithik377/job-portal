// src/redux/store.js - Redux Store for Job Portal

const initialState = {
  appName: "JobPortal Studio",
  version: "4.0.0",
  activeUser: {
    name: "Alex Morgan",
    role: "Applicant",
    email: "alex@jobportal.io"
  },
  savedCount: 3
};

function rootReducer(state = initialState, action) {
  switch (action?.type) {
    case "UPDATE_SAVED_COUNT":
      return { ...state, savedCount: action.payload };
    default:
      return state;
  }
}

// Standard Redux Store conforming to react-redux Provider interface
export function createReduxStore(reducer = rootReducer, preloadedState = initialState) {
  let state = preloadedState;
  const listeners = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
      return action;
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    },
    replaceReducer(nextReducer) {
      reducer = nextReducer;
    },
    [Symbol.observable || "@@observable"]() {
      return {
        subscribe: (observer) => {
          function observe() {
            if (observer.next) observer.next(state);
          }
          observe();
          const unsubscribe = this.subscribe(observe);
          return { unsubscribe };
        }
      };
    }
  };
}

export const reduxStore = createReduxStore();
export default reduxStore;
