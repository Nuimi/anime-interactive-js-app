import * as CONST from '../../constants.js';

export function enterAnimeScreening({ store })
{
  console.log('[enterAnimeScreening] store ->', store);
  store.setState((state) => (
        {
        ...state,
        ui: {
          ...state.ui,
          mode: CONST.ANIME_LIST,
          selectedanimeId: null,
          status: 'READY',
          errorMessage: null,
        },
      }
    )
  );
}
