export async function cancelExamTerm({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId } = payload;

  const { status, reason, exam } = await api.cancelExamTerm(examId, token);

  store.setState((state) => {
    let { exams } = state;
    let notification = null;

    if (status === "SUCCESS") {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
    }

    if (status === "REJECTED") {
      notification = {
        type: "WARNING",
        message: "Termín nelze zrušit", // TODO překlad reason
      };
    }

    return {
      ...state,
      exams,
      ui: {
        ...state.ui,
        notification,
      },
    };
  });
}
