export async function unpublishExamTerm({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId } = payload;

  const { status, reason, exam } = await api.unpublishExamTerm(examId, token);

  store.setState((state) => {
    let { exams } = state;
    let notification = null;

    if (status === "SUCCESS") {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
      notification = {
        type: "SUCCESS",
        message: "Termín byl stáhnut ze zveřejnění",
      };
    }

    if (status === "REJECTED") {
      notification = {
        type: "INFO",
        message: "Termín nelze stáhnout ze zveřejnění", // TODO překlad reason
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
