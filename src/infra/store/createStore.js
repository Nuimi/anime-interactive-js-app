// src/infra/store/createStore.js

// jeden zdroj pravdy
// inversion of control
// funkce jako argumenty
// closure

// state je uzavřený v closure, nikdo k němu nemá přímý přístup
// změna stavu = řízená operace

// FP principy (explicitně)
// closure
// inversion of control
// explicitní API

export function createStore(initialState) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function setState(updateFunction) {
    state = updateFunction(state);
    listeners.forEach((l) => l(state));
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    setState,
    subscribe,
  };
}
