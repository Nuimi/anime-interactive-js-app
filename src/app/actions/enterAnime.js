export function enterAnime({ store, payload }) 
{
  store.setState((state) => (
      {
        ...state,
        ui: {
          ...state.ui,
          mode: 'ANIME_DETAIL',
          selectedanimeId: payload.animeId,
          status: 'READY',
          errorMessage: null,
        },
      }
    )
  );
}
