// src/ui/render.js

import { selectViewState } from '../infra/store/selectors.js';
import { createHandlers } from '../app/actionHandlers/createHandlers.js';

import { LoadingView } from './views/LoadingView.js';
import { ErrorView } from './views/ErrorView.js';
import { ExamTermListView } from './views/ExamTermListView.js';
import { ExamTermDetailView } from './views/ExamTermDetailView.js';
import { ExamTermAdministrationView } from './views/ExamTermAdministrationView.js';

import * as CONST from '../constants.js';

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

export function render(root, state, dispatch) {
  root.replaceChildren();

  const viewState = selectViewState(state);

  // továrna ovladačů, t.j. handlerů
  const handlers = createHandlers(dispatch, viewState);

  let view;

  switch (viewState.type) {
    case 'LOADING':
      view = LoadingView();
      break;

    case 'ERROR':
      view = ErrorView({ message: viewState.message, handlers });
      break;

    case CONST.EXAM_LIST:
      view = ExamTermListView({ viewState, handlers });
      break;

    case 'EXAM_TERM_DETAIL':
      if (!viewState.exam) {
        view = ErrorView({ message: 'Zkouškový termín nebyl nalezen.' });
      } else {
        view = ExamTermDetailView({ viewState, handlers });
      }
      break;

    case 'EXAM_TERM_ADMINISTRATION':
      if (!viewState.exam) {
        view = ErrorView({ message: 'Zkouškový termín nebyl nalezen.' });
      } else {
        view = ExamTermAdministrationView({ viewState, handlers });
      }
      break;

    default:
      view = document.createTextNode(`Unknown view type: ${viewState.type}`);
  }

  root.appendChild(view);

  // notifikace (toast)
  const { notification } = state.ui;

  if (notification) {
    const notificationElement = document.createElement('div');
    notificationElement.textContent = notification.message;
    notificationElement.classList.add('notification');
    root.appendChild(notificationElement);
  }
}
