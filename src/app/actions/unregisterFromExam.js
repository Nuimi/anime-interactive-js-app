export async function unregisterFromExam(store, api, payload) {
  const { animeId } = payload;
  const state = store.getState();
  const userId = state.currentUser.userId;

  // čekáme na backend
  store.setState((state) => {
    return {
      ...state,
      ui: { ...state.ui, status: "LOADING", errorMessage: null },
    };
  });

  try {
    const { exam, registration } = await api.unregisterFromExam(animeId, userId);

    // lokální aktualizace stavu
    store.setState((state) => {
      return {
        ...state,
        registrations: state.registrations.map((r) =>
          r.id === registration.id ? registration : r,
        ),
        animeScreening: state.animeScreening.map((e) => (e.id === exam.id ? exam : e)),
        ui: { ...state.ui, status: "READY", errorMessage: null },
      };
    });
  } catch (error) {
    store.setState((state) => {
      return {
        ...state,
        ui: {
          status: "ERROR",
          errorMessage:
            error.message ?? "FE: Student cannot be unregistered for the term",
        },
      };
    });
  }
}
