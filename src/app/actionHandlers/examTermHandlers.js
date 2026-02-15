// src/app/actionHandlers/createExamTermHandlers.js

export function createExamTermHandlers(dispatch, viewState) {
  switch (viewState.type) {
    case 'ANIME_SCREENING':
      return examTermListHandlers(dispatch, viewState);

    case 'ANIME_DETAIL':
      return examTermDetailHandlers(dispatch, viewState);

    case 'EXAM_TERM_ADMINISTRATION':
      return examTermAdministrationHandlers(dispatch, viewState);

    default:
      return {};
  }
}

function examTermListHandlers(dispatch, viewState) {
  const handlers = {};

  handlers.enterDetail = (examId) =>
    dispatch({
      type: 'ENTER_ANIME',
      payload: { examId },
    });

  if (viewState.canCreateExam) {
    handlers.createExamTerm = () => dispatch({ type: 'CREATE_EXAM_TERM' });
  }

  return handlers;
}

function examTermDetailHandlers(dispatch, viewState) {
  const handlers = {};
  const examId = viewState.anime.id;

  //  canPublish: canPublish(state),
  if (viewState.canPublish) {
    handlers.publish = () =>
      dispatch({
        type: 'PUBLISH_EXAM_TERM',
        payload: { examId },
      });
  }

  //  canUnpublish: canUnpublish(state),
  if (viewState.canUnpublish) {
    handlers.unpublish = () =>
      dispatch({
        type: 'UNPUBLISH_EXAM_TERM',
        payload: { examId },
      });
  }

  //  canCancel: canCancel(state),
  if (viewState.canCancel) {
    handlers.cancel = () =>
      dispatch({
        type: 'CANCEL_EXAM_TERM',
        payload: { examId },
      });
  }

  //  canEdit: canEdit(state),
  if (viewState.canEdit) {
    handlers.edit = () =>
      dispatch({
        type: 'EXAM_TERM_ADMINISTRATION',
        payload: { examId },
      });
  }

  if (viewState.canRegister) {
    handlers.register = () =>
      dispatch({
        type: 'REGISTER_FOR_EXAM',
        payload: { examId },
      });
  }

  if (viewState.canUnRegister) {
    handlers.unregister = () =>
      dispatch({
        type: 'UNREGISTER_FROM_EXAM',
        payload: { examId },
      });
  }

  // navigační akce, bez podmínek, na základě kontextu
  handlers.backToList = () => dispatch({ type: 'ENTER_ANIME_SCREENING' });

  handlers.enterAdministration = () =>
    dispatch({
      type: 'ENTER_EXAM_TERM_ADMINISTRATION',
      payload: { examId },
    });

  return handlers;
}

function examTermAdministrationHandlers(dispatch, viewState) {
  const handlers = {};
  const examId = viewState.anime.id;

  if (viewState.canPublish) {
    handlers.publish = () =>
      dispatch({
        type: 'PUBLISH_EXAM_TERM',
        payload: { examId },
      });
  }

  if (viewState.canUnpublish) {
    handlers.unpublish = () =>
      dispatch({
        type: 'UNPUBLISH_EXAM_TERM',
        payload: { examId },
      });
  }

  if (viewState.canCancel) {
    handlers.cancel = () =>
      dispatch({
        type: 'CANCEL_EXAM_TERM',
        payload: { examId },
      });
  }

  if (viewState.canEdit) {
    handlers.edit = () =>
      dispatch({
        type: 'EXAM_TERM_ADMINISTRATION',
        payload: { examId },
      });
  }

  handlers.backToDetail = () =>
    dispatch({
      type: 'ENTER_ANIME',
      payload: { examId },
    });

  return handlers;
}
