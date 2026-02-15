export async function updateExamCapacity(store, api, payload) {
  const { examId, capacity } = payload;
  console.log(
    "Dostal jsem data pro zápis na termín, termín: ",
    examId,
    " nová kapacita: ",
    capacity,
  );

  // čekáme na backend
  store.setState((state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        status: "LOADING",
        errorMessage: null,
      },
    };
  });

  try {
    const { exam } = await api.updateExamCapacity(examId, capacity);

    store.setState((state) => {
      return {
        ...state,
        ui: {
          ...state.ui,
          status: "READY",
          mode: "LIST",
          selectedExamId: null,
          errorMessage: null,
        },
        exams: state.exams.map((e) => (e.id === exam.id ? exam : e)),
      };
    });
  } catch (error) {
    store.setState((state) => {
      return {
        ...state,
        ui: {
          status: "ERROR",
          errorMessage: error.message ?? "Neznámá chyba",
        },
      };
    });
  }
}
