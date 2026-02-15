export function recoverFromError(store) {
  store.setState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      status: "READY",
      errorMessage: null,
    },
  }));
}
