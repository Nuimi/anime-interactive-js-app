import * as CONST from '../../constants.js';

export async function deleteExamTerm({ store, api, payload }) {
  const token = store.getState().auth.token;
  const { examId } = payload;

  const { status, reason, exam } = await api.deleteExamTerm(examId, token);

  store.setState((state) => {
    let { exams } = state;
    let { mode, selectedExamId } = state.ui;
    let notification = null;

    if (status === "SUCCESS") {
      exams = state.exams.filter((e) => e.id !== exam.id);
      mode = CONST.EXAM_LIST;
      selectedExamId = null;
    }

    if (status === "REJECTED") {
      notification = {
        type: "WARNING",
        message: "Termín nelze smazat", // TODO překlad reason
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
