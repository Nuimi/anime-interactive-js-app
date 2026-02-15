export function startExamTermEdit(store, payload) {
  store.setState((state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        mode: "EXAM_TERM_ADMINISTRATION",
        selectedExamId: payload.examId,
      },
    };
  });
}
