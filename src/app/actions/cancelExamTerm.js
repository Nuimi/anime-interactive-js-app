export async function cancelExamTerm(store, api, payload) {
  const { animeId } = payload;
  //const state = store.getState();

  store.setState((state) => {
    return {
      ...state,
      ui: { ...state.ui, status: "LOADING", errorMessage: null },
    };
  });

  try {
    await api.cancelExamTerm(animeId);
    // volání neskončilo chybou, zkouškový termín lze zrušit
    store.setState((state) => {
      return {
        ...state,
        animeScreening: state.animeScreening.filter((t) => t.id !== animeId),
        ui: { ...state.ui, status: "READY", errorMessage: null },
      };
    });
  } catch (error) {
    store.setState((state) => {
      return {
        ...state,
        ui: {
          status: "ERROR",
          errorMessage: error.message ?? "FE: Nelze zrušit zkouškový termín",
        },
      };
    });
  }
}
