export function enterAnimeScreening({ store })
{
  console.log('[enterAnimeScreening] store ->', store);
  store.setState((state) => (
        {
        ...state,
        ui: {
          ...state.ui,
          mode: 'ANIME_SCREENING',
          selectedanimeId: null,
          status: 'READY',
          errorMessage: null,
        },
      }
    )
  );
}
