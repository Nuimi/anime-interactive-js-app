export function enterExamTermAdministration({ store, payload }) {
  const { examId } = payload;
  store.setState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      mode: 'EXAM_TERM_ADMINISTRATION',
      selectedExamId: examId,
      status: 'READY',
      errorMessage: null,
    },
  }));
}
