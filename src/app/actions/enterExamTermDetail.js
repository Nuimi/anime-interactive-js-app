export function enterExamTermDetail({ store, payload }) {
  store.setState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      mode: "EXAM_TERM_DETAIL",
      selectedExamId: payload.examId,
      status: "READY",
      errorMessage: null,
    },
  }));
}
