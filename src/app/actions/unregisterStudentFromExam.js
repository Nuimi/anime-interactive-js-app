export async function unregisterStudentFromExam({ store, api, payload })
{
  const token = store.getState().auth.token;
  const { examId, studentId } = payload;
  const userId = store.getState().userId;

  const { status, reason, registration, exam } = await api.examTerms.unregisterStudentFromExam(examId, studentId, userId, token);

  store.setState((state) => {
    let { exams, registrations } = state;
    let notification = null;

    if (status === 'SUCCESS')
    {
      exams = state.exams.map((e) => (e.id === exam.id ? exam : e));
      registrations = state.registrations.map((r) => (r.examId === registration.examId && r.userId === registration.userId ? registration : r));
    }

    if (status === 'REJECTED')
    {
      console.log(reason)
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
