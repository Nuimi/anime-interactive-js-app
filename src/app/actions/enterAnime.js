export function enterAnime({ store, payload }) 
{
  store.setState((state) => (
      {
        ...state,
        ui: {
          ...state.ui,
          mode: 'ANIME_DETAIL',
          selectedExamId: payload.examId,
          status: 'READY',
          errorMessage: null,
        },
      }
    )
  );
}
