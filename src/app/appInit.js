import { urlToAction } from '../infra/router/router.js';

// první akce aplikace
export async function appInit({ store, api, dispatch }) {
  // const token = 'student-1_12345678';
  const token = 'teacher-1_25893255';

  store.setState((state) => ({
    ...state,
    ui: { ...state.ui, status: 'LOADING', errorMessage: null },
  }));

  const whoResult = await api.whoAmI(token);

  let auth = {
    role: 'ANONYMOUS',
    userId: null,
    token: null,
  };

  if (whoResult.status === 'SUCCESS') {
    auth = {
      role: whoResult.role,
      userId: whoResult.userId,
      token,
    };
  }

  // načtení doménových dat
  const dataResult = await api.getExams(token);

  if (dataResult.status !== 'SUCCESS') {
    store.setState((state) => ({
      ...state,
      auth,
      ui: { ...state.ui, status: 'ERROR', errorMessage: 'Nepodařilo se načíst data' },
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
    ui: { ...state.ui, status: 'READY', errorMessage: null },
  }));

  // první navigace
  const initialAction = urlToAction(window.location.href);
  dispatch(initialAction);
}
