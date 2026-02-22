export async function updateExamCapacity({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId, capacity } = payload;
  const { status, reason, exam } = await api.updateExamCapacity(
    examId,
    capacity,
    token,
  );

  store.setState((state) => {
    let { exams } = state;
    let notification = null;

    if (status === "SUCCESS") {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
    }
    if (status === "REJECTED") {
      notification = {
        type: "WARNING",
        message: "Kapacitu nelze změnit", // TODO překlad reason
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
