import * as CONST from '../../constants.js';

export function selectRegistrations(state) {
  return state.registrations ?? [];
}

export function selectExams(state) {
  return state.animeScreening ?? [];
}

export function selectExamById(state) {
  const animeId = state.ui.selectedanimeId;
  if (!animeId) return null;
  return state.animeScreening.find((e) => e.id === animeId) ?? null;
}

export function selectCurrentRegistration(state) {
  const animeId = state.ui.selectedanimeId;
  const userId = state.auth.userId;

  if (!animeId || !userId) return null;

  return (
    state.registrations.find((r) => r.userId === userId && r.animeId === animeId && r.status === 'REGISTERED') || null
  );
}

export function createCurrentRegistrationViewState(state) {
  const registration = selectCurrentRegistration(state);
  if (!registration) return { type: 'NOT_REGISTERED' };
  return { type: 'REGISTERED', registration };
}

export function selectVisibleRegistrationsForSelectedExam(state) {
  const animeId = state.ui.selectedanimeId;
  if (!animeId) return [];

  const { role, userId } = state.auth;
  if (role === 'ANONYMOUS') {
    return [];
  }

  const examRegistrations = state.registrations.filter((r) => r.animeId === animeId);

  if (role === 'TEACHER') {
    return examRegistrations.filter((r) => r.status === 'REGISTERED');
  }

  if (role === 'STUDENT') {
    return examRegistrations.filter((r) => r.userId === userId);
  }
}

export function canRegister(state) {
  if (state.ui.status !== 'READY') return false;
  if (state.auth.role !== 'STUDENT') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  if (exam.status !== 'OPEN') return false;
  if (exam.registeredCount >= exam.capacity) return false;

  const registration = selectCurrentRegistration(state);
  // student se ještě nikdy nepřihlásil
  if (!registration) return true;

  return false;
}

export function canUnregister(state) {
  if (state.ui.status !== 'READY') return false;
  if (state.auth.role !== 'STUDENT') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  if (exam.status !== 'OPEN') return false;

  const registration = selectCurrentRegistration(state);
  // student se ještě nikdy nepřihlásil
  if (!registration) return false;

  return true;
}

export function canPublish(state) {
  const exam = selectExamById(state);
  if (!exam) return false;

  return exam.status === 'DRAFT';
}

export function canUnpublish(state) {
  const exam = selectExamById(state);
  if (!exam) return false;

  return exam.status === 'OPEN';
}

export function canCancel(state) {
  const exam = selectExamById(state);
  if (!exam) return false;

  return exam.status === 'OPEN' || exam.status === 'DRAFT';
}

export function canEdit(state) {
  const exam = selectExamById(state);
  if (!exam) return false;

  return exam.status === 'DRAFT' || exam.status === 'OPEN';
}
// state.ui.mode = pojmenované navigační kontexty
// EXAM_TERM_REGISTRATION .. workflow kontext: register, unregister
// EXAM_TERM_ADMINISTRATION .. administrační kontext - spravuji termín: edit, publish, cancel
// ANIME_DETAIL .. : detailový kontext - prohlížím si jeden : view detail
// ANIME_SCREENING .. kolekční kontext - prohlížím si seznam: view list, filter, sort

function selectAnonymousView(state) {
  // třetí osa rozhodování
  switch (state.ui.mode) {
    case CONST.DETAIL:
      return {
        type: CONST.DETAIL,
        anime: selectExamById(state),
      };
    case CONST.ANIME_LIST:
      return {
        type: CONST.ANIME_LIST,
        animeList: selectExams(state),
      };
    default:
      return {
        type: 'ERROR',
        message: `Anonymous role - Unknown ui mode: ${state.ui.mode}`,
      };
  }
}

function selectStudentView(state) {
  switch (state.ui.mode) {
    case CONST.DETAIL:
      return {
        type: CONST.DETAIL,
        anime: selectExamById(state),
        registrations: selectVisibleRegistrationsForSelectedExam(state),
        currentRegistration: createCurrentRegistrationViewState(state),
        registrationStatus: createCurrentRegistrationViewState(state).type,
        canRegister: canRegister(state),
        canUnRegister: canUnregister(state),
      };

    case CONST.ANIME_LIST:
      return {
        type: CONST.ANIME_LIST,
        animeList: selectExams(state),
      };

    default:
      return {
        type: 'ERROR',
        message: `Student role - Unknown ui mode: ${state.ui.mode}`,
      };
  }
}

function selectTeacherView(state) {
  // třetí osa rozhodování

  switch (state.ui.mode) {
    case CONST.ANIME_LIST:
      return {
        type: CONST.ANIME_LIST,
        animeList: selectExams(state),
      };

    case CONST.DETAIL:
      return {
        type: CONST.DETAIL,
        anime: selectExamById(state),
        registrations: selectVisibleRegistrationsForSelectedExam(state),
        canEdit: canEdit(state),
        canPublish: canPublish(state),
        canUnpublish: canUnpublish(state),
        canCancel: canCancel(state),
      };

    case 'EXAM_TERM_ADMINISTRATION':
      return {
        type: 'EXAM_TERM_ADMINISTRATION',
        anime: selectExamById(state),
        canPublish: canPublish(state),
        canUnpublish: canUnpublish(state),
        canCancel: canCancel(state),
        canEdit: canEdit(state),
      };

    default:
      return {
        type: 'ERROR',
        message: `Teacher role - Unknown ui mode: ${state.ui.mode}`,
      };
  }
}

export function selectViewState(state)
{
  const { status, errorMessage, mode } = state.ui;

  switch (status)
  {
    case 'LOADING':
      return { type: 'LOADING' };

    case 'ERROR':
      return { type: 'ERROR', message: errorMessage };

    case 'READY':
      // druhá osa rozhodování
      switch (state.auth.role) {
        case 'ANONYMOUS':
          return selectAnonymousView(state);

        case 'STUDENT':
          return selectStudentView(state);

        case 'TEACHER':
          return selectTeacherView(state);

        default:
          return {
            type: 'NOT_AUTHORIZED',
            message: `Unknown role: ${state.auth.role}`,
          };
      }

    default:
      return {
        type: 'ERROR',
        message: `Unknown ui status: ${state.ui.status}`,
      };
  }
}
