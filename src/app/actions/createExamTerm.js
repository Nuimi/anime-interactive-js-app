export async function createExamTerm({ store, api, payload }) {
  const token = store.getState().auth.token;

  const { status, reason, exam } = await api.createExamTerm(payload, token);

  store.setState((state) => {
    let { exams } = state;
    let { mode, selectedExamId } = state.ui;
    let notification = null;

    if (status === "SUCCESS") {
      exams = [...state.exams, exam];
      selectedExamId = exam.id;
      mode = "EXAM_TERM_DETAIL";
    }

    if (status === "REJECTED") {
      notification = {
        type: "WARNING",
        message: "Termín nelze vytvořit", // TODO překlad reason
      };
    }

    return {
      ...state,
      exams,
      ui: {
        ...state.ui,
        mode,
        selectedExamId,
        notification,
      },
    };
  });
}
