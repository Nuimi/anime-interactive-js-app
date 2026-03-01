import * as CONST from '../../constants.js';
import * as STATUS from '../../statuses.js';
import {
    CANCEL,
    DELETE, EXAM_ADMIN,
    EXAM_DETAIL,
    PUBLISH,
    REGISTER_F_EXAM,
    UNPUBLISH,
    UPDATE_CAPACITY,
    UPDATE_TERM
} from "../../constants.js";

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

    case CONST.EXAM_DETAIL:
      return examTermDetailHandlers(dispatch, viewState);

    case CONST.EXAM_ADMIN:
      return examTermAdministrationHandlers(dispatch, viewState);

    case STATUS.ERR:
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
        type: CONST.ENTER_DETAIL,
        payload: { examId },
      });
  }

  if (canEnterAdministration) {
    handlers.onEnterAdministration = (examId) =>
      dispatch({
        type: CONST.ENTER_ADMIN,
        payload: { examId },
      });
  }

  if (canCreateExam) {
    handlers.onCreateExamTerm = (data) =>
      dispatch({
        type: CONST.ENTER_CREATE,
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
    canUnregisterStudent,
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
        type: CONST.ENTER_ADMIN,
        payload: { examId },
      });
  }

  // canUnregisterStudent: canUnregisterStudent(state)
  if (canUnregisterStudent)
  {
    handlers.onUnregisterStudent = (studentId) =>
      dispatch({
        type: CONST.UNREGISTER_STUDENT,
        payload: {
            examId,
            studentId
        },
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
        type: CONST.REGISTER_F_EXAM,
        payload: { examId },
      });
  }

  // canUnregister: canUnregister(state)
  if (canUnregister) {
    handlers.onUnregister = () =>
      dispatch({
        type: CONST.UNREGISTER_F_EXAM,
        payload: { examId },
      });
  }

  //  canPublish: canPublish(state)
  if (canPublish) {
    handlers.onPublish = () =>
      dispatch({
        type: CONST.PUBLISH,
        payload: { examId },
      });
  }

  //  canUnpublish: canUnpublish(state)
  if (canUnpublish) {
    handlers.onUnpublish = () =>
      dispatch({
        type: CONST.UNPUBLISH,
        payload: { examId },
      });
  }

  //  canCancel: canCancel(state)
  if (canCancel) {
    handlers.onCancel = () =>
      dispatch({
        type: CONST.CANCEL,
        payload: { examId },
      });
  }

  // canDelete: canDelete(state)
  if (canDelete) {
    handlers.onDelete = () =>
      dispatch({
        type: CONST.DELETE,
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
        type: CONST.DELETE,
        payload: { examId },
      });
  }

  // canCancel: canCancel(state)
  if (canCancel) {
    handlers.onCancel = () =>
      dispatch({
        type: CONST.CANCEL,
        payload: { examId },
      });
  }

  // canUpdateCapacity: canUpdateCapacity(state)
  if (canUpdateCapacity) {
    handlers.onUpdateCapacity = (capacity) =>
      dispatch({
        type: CONST.UPDATE_CAPACITY,
        payload: { examId, capacity },
      });
  }

  // canUpdate: canUpdate(state)
  if (canUpdate) {
    handlers.onUpdate = (data) =>
      dispatch({
        type: CONST.UPDATE_TERM,
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
