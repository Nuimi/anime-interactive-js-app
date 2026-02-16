import * as CONST from '../../constants.js';

export function enterAnime({ store, payload })
{
  store.setState((state) => (
      {
        ...state,
        ui: {
          ...state.ui,
          mode: CONST.DETAIL,
          selectedanimeId: payload.animeId,
          status: 'READY',
          errorMessage: null,
        },
      }
    )
  );
}
