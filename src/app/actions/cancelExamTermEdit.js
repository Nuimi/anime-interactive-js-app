export function cancelExamTermEdit(store) {
  store.setState((state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        mode: "LIST",
        selectedExamId: null,
      },
    };
  });
}
