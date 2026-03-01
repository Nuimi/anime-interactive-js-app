import { urlToAction } from '../infra/router/router.js';
import * as STATUS from '../statuses.js';

// první akce aplikace
export async function appInit({ store, api, dispatch }) {
  // const token = 'student-1_12345678';
  const token = 'teacher-1_25893255';

  store.setState((state) => ({
    ...state,
    ui: { ...state.ui, status: STATUS.LOAD, errorMessage: null },
  }));

  const whoResult = await api.whoAmI(token);

  let auth = {
    role: 'ANONYMOUS',
    userId: null,
    token: null,
  };

  if (whoResult.status === STATUS.OK) {
    auth = {
      role: whoResult.role,
      userId: whoResult.userId,
      token,
    };
  }

  // načtení doménových dat
  const dataResult = await api.getExams(token);

  if (dataResult.status !== STATUS.OK) {
    store.setState((state) => ({
      ...state,
      auth,
      ui: { ...state.ui, status: STATUS.ERR, errorMessage: 'Nepodařilo se načíst data' },
    }));
    return;
  }

  const { exams, registrations } = dataResult;

  // přepnutí do READY stavu
  store.setState((state) => ({
    ...state,
    auth,
    exams,
    registrations,
    ui: { ...state.ui, status: STATUS.RDY, errorMessage: null },
  }));

  // první navigace
  const initialAction = urlToAction(window.location.href);
  dispatch(initialAction);
}
