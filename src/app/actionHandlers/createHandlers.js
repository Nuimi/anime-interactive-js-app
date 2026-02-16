export function createHandlers(dispatch, viewState)
{
  switch (viewState.type)
  {
    case 'ANIME_SCREENING':
      return animeScreeningHandlers(dispatch, viewState);

    case 'ANIME_DETAIL':
      return animeDetailHandlers(dispatch, viewState);

    case 'EXAM_TERM_ADMINISTRATION':
      return examTermAdministrationHandlers(dispatch, viewState);

    case 'ERROR':
        return errorHandlers(dispatch);

    default:
      return {};
  }
}

function animeScreeningHandlers(dispatch, viewState) {
  const handlers = {};

  handlers.enterDetail = (animeId) =>
    dispatch({
      type: 'ENTER_ANIME',
      payload: { animeId },
    });

  if (viewState.canCreateExam) {
    handlers.createExamTerm = () => dispatch({ type: 'CREATE_EXAM_TERM' });
  }

  return handlers;
}

function animeDetailHandlers(dispatch, viewState) {
  const handlers = {};
  const animeId = viewState.anime.id;

  //  canPublish: canPublish(state),
  if (viewState.canPublish) {
    handlers.publish = () =>
      dispatch({
        type: 'PUBLISH_EXAM_TERM',
        payload: { animeId },
      });
  }

  //  canUnpublish: canUnpublish(state),
  if (viewState.canUnpublish) {
    handlers.unpublish = () =>
      dispatch({
        type: 'UNPUBLISH_EXAM_TERM',
        payload: { animeId },
      });
  }

  //  canCancel: canCancel(state),
  if (viewState.canCancel) {
    handlers.cancel = () =>
      dispatch({
        type: 'CANCEL_EXAM_TERM',
        payload: { animeId },
      });
  }

  //  canEdit: canEdit(state),
  if (viewState.canEdit) {
    handlers.edit = () =>
      dispatch({
        type: 'EXAM_TERM_ADMINISTRATION',
        payload: { animeId },
      });
  }

  if (viewState.canRegister) {
    handlers.register = () =>
      dispatch({
        type: 'REGISTER_FOR_EXAM',
        payload: { animeId },
      });
  }

  if (viewState.canUnRegister) {
    handlers.unregister = () =>
      dispatch({
        type: 'UNREGISTER_FROM_EXAM',
        payload: { animeId },
      });
  }

  // navigační akce, bez podmínek, na základě kontextu
  handlers.backToList = () =>
      dispatch({ type: 'ENTER_ANIME_SCREENING' });

  handlers.enterAdministration = () =>
    dispatch({
      type: 'ENTER_EXAM_TERM_ADMINISTRATION',
      payload: { animeId },
    });

  return handlers;
}

function examTermAdministrationHandlers(dispatch, viewState) {
  const handlers = {};
  const animeId = viewState.anime.id;

  if (viewState.canPublish) {
    handlers.publish = () =>
      dispatch({
        type: 'PUBLISH_EXAM_TERM',
        payload: { animeId },
      });
  }

  if (viewState.canUnpublish) {
    handlers.unpublish = () =>
      dispatch({
        type: 'UNPUBLISH_EXAM_TERM',
        payload: { animeId },
      });
  }

  if (viewState.canCancel) {
    handlers.cancel = () =>
      dispatch({
        type: 'CANCEL_EXAM_TERM',
        payload: { animeId },
      });
  }

  if (viewState.canEdit) {
    handlers.edit = () =>
      dispatch({
        type: 'EXAM_TERM_ADMINISTRATION',
        payload: { animeId },
      });
  }

  handlers.backToDetail = () =>
    dispatch({
      type: 'ENTER_ANIME',
      payload: { animeId },
    });

  return handlers;
}

export function errorHandlers(dispatch) {
    return {
        onContinue: () =>
            dispatch({
                type: "RECOVER_FROM_ERROR",
            }),
    };
}
