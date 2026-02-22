export async function publishExamTerm({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId } = payload;

  const { status, reason, exam } = await api.publishExamTerm(examId, token);

  store.setState((state) => {
    let { exams } = state;
    let notification = null;

    if (status === "SUCCESS") {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
      notification = {
        type: "SUCCESS",
        message: "Termín byl publikován",
      };
    }

    if (status === "REJECTED") {
      notification = {
        type: "WARNING",
        message: "Termín nelze publikovat", // TODO překlad reason
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
