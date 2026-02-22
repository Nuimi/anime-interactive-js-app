import * as CONST from '../../constants.js';

export function enterExamTermList({ store }) {
  store.setState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      mode: CONST.EXAM_LIST,
      selectedExamId: null,
      status: 'READY',
      errorMessage: null,
    },
  }));
}
