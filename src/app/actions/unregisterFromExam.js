export async function unregisterFromExam({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId } = payload;

  const userId = store.getState().userId;

  const { status, reason, registration, exam } = await api.unregisterFromExam(examId, userId, token);

  store.setState((state) => {
    let { exams, registrations } = state;
    let notification = null;

    if (status === 'SUCCESS') {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
      registrations = state.registrations.map((r) => (r.id === registration.id ? registration : r));
    }

    if (status === 'REJECTED') {
      notification = {
        type: 'WARNING',
        message: 'Registraci nelze zrušit', // TODO překlad reason
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
