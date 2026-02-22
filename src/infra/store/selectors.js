import * as CONST from '../../constants.js';
// předpokládáme, že selectViewState je jediné místo rozhodování o stavo-pohledu aplikace

export function selectExams(state) {
  return state.exams ?? [];
}

export function selectExamById(state) {
  const examId = state.ui.selectedExamId;
  if (!examId) return null;
  return state.exams.find((e) => e.id === examId) ?? null;
}

// state.ui.mode = pojmenované navigační kontexty
// EXAM_TERM_ADMINISTRATION .. administrační kontext - spravuji termín: edit, publish, cancel
// EXAM_TERM_DETAIL .. : detailový kontext - prohlížím si jeden : view detail
// EXAM_TERM_LIST .. kolekční kontext - prohlížím si seznam: view list, filter, sort

/* ****************************************** */
/*
 *  rozhodování o capabilities
 *
 */
/* ****************************************** */

export function canCreateExam(state) {
  const { role } = state.auth;
  return role === 'TEACHER';
}

// pokud k termínu neexistují žádné registrace, lze jej editovat
// pokud termín není ve stavu CANCELED, lze jej editovat
export function canUpdate(state) {
  const { role } = state.auth;
  if (role !== 'TEACHER') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  if (exam.status === 'CANCELED') return false;

  const hasAnyRegistrations = state.registrations.some((r) => r.examId === exam.id);
  return !hasAnyRegistrations;
}

// pokud termín nebyl zrušen (CANCELED), lze měnit kapacitu
export function canUpdateCapacity(state) {
  const { role } = state.auth;
  if (role !== 'TEACHER') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  const notCanceled = exam.status !== 'CANCELED';
  return notCanceled;
}

export function canCancel(state) {
  const { role } = state.auth;
  if (role !== 'TEACHER') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  if (exam.status === 'CANCELED') return false;

  const registrations = state.registrations.filter((r) => r.examId === exam.id);

  const hasActiveRegistrations = registrations.some((r) => r.status === 'REGISTERED');
  if (hasActiveRegistrations) return false;

  const hasAnyRegistrations = registrations.length > 0;
  return hasAnyRegistrations;
}

export function canDelete(state) {
  const { role } = state.auth;
  if (role !== 'TEACHER') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  const hasAnyRegistrations = state.registrations.some((r) => r.examId === exam.id);
  return !hasAnyRegistrations;
}

export function canEnterAdministration(state) {
  const { role } = state.auth;
  return role === 'TEACHER';
}

export function canPublish(state) {
  const { role } = state.auth;
  if (role !== 'TEACHER') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  return exam.status === 'DRAFT';
}

export function canUnpublish(state) {
  const { role } = state.auth;
  if (role !== 'TEACHER') return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  const hasActiveRegistrations = state.registrations.some((r) => r.examId === exam.id && r.status === 'REGISTERED');
  if (hasActiveRegistrations) return false;

  return exam.status === 'PUBLISHED';
}

export function canRegister(state) {
  const { role, userId } = state.auth;
  if (role !== 'STUDENT') return false;
  if (!userId) return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  if (exam.status !== 'PUBLISHED') return false;

  const activeRegistrations = state.registrations.filter((r) => r.examId === exam.id && r.status === 'REGISTERED');
  if (activeRegistrations.length >= exam.capacity) return false;

  const hasRegistered = activeRegistrations.some((r) => r.userId === userId);
  return !hasRegistered;
}

export function canUnregister(state) {
  const { role, userId } = state.auth;
  if (role !== 'STUDENT') return false;
  if (!userId) return false;

  const exam = selectExamById(state);
  if (!exam) return false;

  if (exam.status !== 'PUBLISHED') return false;

  const hasRegistered = state.registrations.some(
    (r) => r.userId === userId && r.status === 'REGISTERED' && r.examId === exam.id,
  );
  return hasRegistered;
}

/* ****************************************** */
/*
 * vybírání pohledů
 */
/* ****************************************** */

export function selectExamTermListView(state) {
  const exams = selectExams(state);
  return {
    type: CONST.EXAM_LIST,
    exams,
    capabilities: {
      // navigační možnosti
      canEnterDetail: true,
      canEnterAdministration: canEnterAdministration(state),
      // doménové možnosti
      canCreateExam: canCreateExam(state),
    },
  };
}

export function selectExamTermDetailView(state) {
  const exam = selectExamById(state);
  return {
    type: 'EXAM_TERM_DETAIL',
    exam,
    capabilities: {
      // navigační možnosti
      canBackToList: true,
      canEnterAdministration: canEnterAdministration(state),
      // doménové možnosti
      canRegister: canRegister(state),
      canUnregister: canUnregister(state),
      canPublish: canPublish(state),
      canUnpublish: canUnpublish(state),
      canCancel: canCancel(state),
      canDelete: canDelete(state),
    },
  };
}

export function selectExamTermAdministrationView(state) {
  const { role } = state.auth;
  const exam = selectExamById(state);

  if (role !== 'TEACHER') {
    return {
      type: 'ERROR',
      message: `Not authorized`,
    };
  }

  return {
    type: 'EXAM_TERM_ADMINISTRATION',
    exam,
    capabilities: {
      // navigační možnosti
      canBackToList: true,
      // doménové možnosti
      canDelete: canDelete(state),
      canCancel: canCancel(state),
      canUpdateCapacity: canUpdateCapacity(state),
      canUpdate: canUpdate(state), // nastavení parametrů termínu - kapacita, název, čas
    },
  };
}

/*
 ** vrací objekt ve tvaru
 ** {
 **   type: 'LOADING' | 'ERROR' | EXAM_TERM_LIST | 'EXAM_TERM_DETAIL' | 'EXAM_TERM_ADMINISTRATION',
 **   message?: string ,
 **   exam?: ExamTerm,
 **   exams?: ExamTerm[],
 **   capabilities?: {
 **     canEnterDetail: boolean,
 **     canEnterAdministration: boolean,
 **     canBackToList: boolean,
 **     canCreateExam: boolean,
 **     canRegister: boolean,
 **     canUnregister: boolean,
 **     canPublish: boolean,
 **     canUnpublish: boolean,
 **     canCancel: boolean,
 **     canDelete: boolean,
 **     canUpdateCapacity: boolean,
 **     canUpdate: boolean
 **   },
 ** }
 */
export function selectViewState(state) {
  const { status, errorMessage, mode } = state.ui;

  // první aspekt: technický stav
  if (status === 'LOADING') {
    return { type: 'LOADING' };
  }

  if (status === 'ERROR') {
    return { type: 'ERROR', message: errorMessage };
  }

  if (status !== 'READY') {
    return { type: 'ERROR', message: `Unknown ui status: ${status}` };
  }

  // druhý aspekt: mode

  switch (mode) {
    case CONST.EXAM_LIST:
      return selectExamTermListView(state);
    case 'EXAM_TERM_DETAIL':
      return selectExamTermDetailView(state);
    case 'EXAM_TERM_ADMINISTRATION':
      return selectExamTermAdministrationView(state);
    default:
      return { type: 'ERROR', message: `Unknown ui mode: ${mode}` };
  }
}
