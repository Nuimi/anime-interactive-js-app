export function enterAnimeScreening({ store })
{
  console.log('[enterAnimeScreening] store ->', store);
  store.setState((state) => (
        {
        ...state,
        ui: {
          ...state.ui,
          mode: 'ANIME_SCREENING',
          selectedExamId: null,
          status: 'READY',
          errorMessage: null,
        },
      }
    )
  );
}
