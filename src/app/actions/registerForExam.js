export async function registerForExam({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId } = payload;

  const userId = store.getState().auth.userId;

  const { status, reason, registration, exam } = await api.registerForExam(examId, userId, token);

  store.setState((state) => {
    let { exams, registrations } = state;
    let notification = null;

    if (status === 'SUCCESS') {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
      registrations = [...state.registrations, registration];
    }

    if (status === 'REJECTED') {
      notification = {
        type: 'WARNING',
        message: 'Registraci nelze vytvořit', // TODO překlad reason
      };
    }

    return {
      ...state,
      exams,
      registrations,
      ui: {
        ...state.ui,
        notification,
      },
    };
  });
}
