export async function registerForExam(store, api, payload) {
  const { examId } = payload;
  const state = store.getState();

  // invariant:

  store.setState((state) => ({
    ...state,
    ui: { ...state.ui, status: "LOADING", errorMessage: null },
  }));
  console.log(
    `Data pro zápis na termín. Termín: ${examId}, student: ${state.currentUser.userId}`,
  );
  try {
    const { exam, registration } = await api.registerForExam(
      examId,
      state.currentUser.userId,
    );

    store.setState((state) => ({
      ...state,
      ui: { ...state.ui, status: "READY", errorMessage: null },
      registrations: [...state.registrations, registration],
      exams: state.exams.map((e) => (e.id === exam.id ? exam : e)),
    }));
    console.log(
      "Stav aktualizovaný po odpovědi backendu, zkoušky:",
      store.getState().exams,
    );
  } catch (error) {
    store.setState((state) => ({
      ...state,
      ui: {
        status: "ERROR",
        errorMessage: error.message ?? "Neznámá chyba",
      },
    }));
  }
}
