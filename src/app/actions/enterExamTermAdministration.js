export function enterExamTermAdministration({ store, payload }) {
  const { animeId } = payload;
  store.setState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      mode: 'EXAM_TERM_ADMINISTRATION',
      selectedanimeId: animeId,
      status: 'READY',
      errorMessage: null,
    },
  }));
}
