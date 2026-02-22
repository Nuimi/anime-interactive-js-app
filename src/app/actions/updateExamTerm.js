export async function updateExamTerm({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId, ...data } = payload;

  const { status, reason, exam } = await api.updateExamTerm(examId, data, token);

  store.setState((state) => {
    let { exams } = state;
    let notification = null;

    if (status === 'SUCCESS') {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
    } else if (status === 'REJECTED') {
      notification = {
        type: 'WARNING',
        message: 'Termín nelze změnit', // TODO překlad reason
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
