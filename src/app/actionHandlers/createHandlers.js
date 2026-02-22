import * as CONST from '../../constants.js';

/*
 ** viewState má tvar
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

export function createHandlers(dispatch, viewState) {
  switch (viewState.type) {
    case CONST.EXAM_LIST:
      return examTermListHandlers(dispatch, viewState);

    case 'EXAM_TERM_DETAIL':
      return examTermDetailHandlers(dispatch, viewState);

    case 'EXAM_TERM_ADMINISTRATION':
      return examTermAdministrationHandlers(dispatch, viewState);

    case 'ERROR':
      return errorHandlers(dispatch);

    default:
      return {};
  }
}

/* viewState ma tvar:
 *  {
 *    type: EXAM_TERM_LIST,
 *    exams,
 *    capabilities: {
 *      canEnterDetail: true,
 *      canEnterAdministration: canEnterAdministration(state),
 *      canCreateExam: canCreateExam(state),
 *    },
 *  }
 */

export function examTermListHandlers(dispatch, viewState) {
  const { capabilities } = viewState;
  const { canEnterDetail, canEnterAdministration, canCreateExam } = capabilities;

  const handlers = {};

  if (canEnterDetail) {
    handlers.onEnterDetail = (examId) =>
      dispatch({
        type: 'ENTER_EXAM_TERM_DETAIL',
        payload: { examId },
      });
  }

  if (canEnterAdministration) {
    handlers.onEnterAdministration = (examId) =>
      dispatch({
        type: 'ENTER_EXAM_TERM_ADMINISTRATION',
        payload: { examId },
      });
  }

  if (canCreateExam) {
    handlers.onCreateExamTerm = (data) =>
      dispatch({
        type: 'CREATE_EXAM_TERM',
        payload: data,
      });
  }

  return handlers;
}

/* viewState má tvar:
 *  {
 *    type: 'EXAM_TERM_DETAIL',
 *    exam,
 *    capabilities: {
 *      canBackToList: true,
 *      canEnterAdministration: canEnterAdministration(state),
 *      canRegister: canRegister(state),
 *      canUnregister: canUnregister(state),
 *      canPublish: canPublish(state),
 *      canUnpublish: canUnpublish(state),
 *      canCancel: canCancel(state),
 *      canDelete: canDelete(state),
 *    },
 *  }
 */
export function examTermDetailHandlers(dispatch, viewState) {
  const { capabilities } = viewState;
  const {
    canBackToList,
    canEnterAdministration,
    canRegister,
    canUnregister,
    canPublish,
    canUnpublish,
    canCancel,
    canDelete,
  } = capabilities;
  const handlers = {};
  const examId = viewState.exam?.id;

  if (!examId) {
    return handlers;
  }

  /*******************************************
   * navigační akce
   *
   ******************************************/
  // canBackToList: true
  if (canBackToList) {
    handlers.onBackToList = () => dispatch({ type: CONST.ENTER_LIST });
  }

  // canEnterAdministration: canEnterAdministration(state)
  if (canEnterAdministration) {
    handlers.onEnterAdministration = () =>
      dispatch({
        type: 'ENTER_EXAM_TERM_ADMINISTRATION',
        payload: { examId },
      });
  }

  /*******************************************
   * doménové akce, na základě kontextu
   *
   *******************************************/

  // canRegister: canRegister(state)
  if (canRegister) {
    handlers.onRegister = () =>
      dispatch({
        type: 'REGISTER_FOR_EXAM_TERM',
        payload: { examId },
      });
  }

  // canUnregister: canUnregister(state)
  if (canUnregister) {
    handlers.onUnregister = () =>
      dispatch({
        type: 'UNREGISTER_FROM_EXAM',
        payload: { examId },
      });
  }

  //  canPublish: canPublish(state)
  if (canPublish) {
    handlers.onPublish = () =>
      dispatch({
        type: 'PUBLISH_EXAM_TERM',
        payload: { examId },
      });
  }

  //  canUnpublish: canUnpublish(state)
  if (canUnpublish) {
    handlers.onUnpublish = () =>
      dispatch({
        type: 'UNPUBLISH_EXAM_TERM',
        payload: { examId },
      });
  }

  //  canCancel: canCancel(state)
  if (canCancel) {
    handlers.onCancel = () =>
      dispatch({
        type: 'CANCEL_EXAM_TERM',
        payload: { examId },
      });
  }

  // canDelete: canDelete(state)
  if (canDelete) {
    handlers.onDelete = () =>
      dispatch({
        type: 'DELETE_EXAM_TERM',
        payload: { examId },
      });
  }

  return handlers;
}

/* viewState ma tvar: {
    type: 'EXAM_TERM_ADMINISTRATION',
    exam,
    capabilities: {
      canBackToList: true,
      canDelete: canDelete(state),
      canCancel: canCancel(state),
      canUpdateCapacity: canUpdateCapacity(state),
      canUpdate: canUpdate(state), // nastavení parametrů termínu - kapacita, název, čas
    },
  }
*/
export function examTermAdministrationHandlers(dispatch, viewState) {
  const { capabilities } = viewState;
  const { canBackToList, canDelete, canCancel, canUpdateCapacity, canUpdate } = capabilities;
  const handlers = {};
  const examId = viewState.exam?.id;

  /*******************************************
   * navigační akce
   *
   ******************************************/
  // canBackToList: true
  if (canBackToList) {
    handlers.onBackToList = () => dispatch({ type: CONST.ENTER_LIST });
  }

  /*******************************************
   * doménové akce, na základě kontextu
   *
   *******************************************/
  if (!examId) {
    return handlers;
  }

  // canDelete: canDelete(state)
  if (canDelete) {
    handlers.onDelete = () =>
      dispatch({
        type: 'DELETE_EXAM_TERM',
        payload: { examId },
      });
  }

  // canCancel: canCancel(state)
  if (canCancel) {
    handlers.onCancel = () =>
      dispatch({
        type: 'CANCEL_EXAM_TERM',
        payload: { examId },
      });
  }

  // canUpdateCapacity: canUpdateCapacity(state)
  if (canUpdateCapacity) {
    handlers.onUpdateCapacity = (capacity) =>
      dispatch({
        type: 'UPDATE_EXAM_CAPACITY',
        payload: { examId, capacity },
      });
  }

  // canUpdate: canUpdate(state)
  if (canUpdate) {
    handlers.onUpdate = (data) =>
      dispatch({
        type: 'UPDATE_EXAM_TERM',
        payload: { examId, ...data },
      });
  }
  return handlers;
}

export function errorHandlers(dispatch) {
  const handlers = {
    onContinue: () => dispatch({ type: CONST.ENTER_LIST }),
  };

  return handlers;
}
