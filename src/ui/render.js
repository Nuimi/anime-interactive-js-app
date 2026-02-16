import { selectViewState } from '../infra/store/selectors.js';
import { createHandlers } from '../app/actionHandlers/createHandlers.js';
import { LoadingView } from './views/LoadingView.js';
import { ErrorView } from './views/ErrorView.js';
import { AnimeListView } from './views/AnimeListView.js';
import { AnimeScreeningDetailView } from './views/AnimeScreeningDetailView.js';
import { ExamTermAdministrationView } from './views/ExamTermAdministrationView.js';

/*
 ** viewState má tvar
 ** {
 **   type: 'LOADING' | 'ERROR' | 'EXAM_TERM_LIST' | 'EXAM_TERM_DETAIL' | 'EXAM_TERM_ADMINISTRATION',
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

  const handlers = createHandlers(dispatch, viewState);

  let view;

  switch (viewState.type) {
    case 'LOADING':
      view = LoadingView();
      break;

    case 'ERROR':
      view = ErrorView({ message: viewState.message });
      break;

    case 'ANIME_SCREENING':
      view = AnimeListView({ viewState, handlers });
      break;

    case 'ANIME_DETAIL':
      if (!viewState.anime)
      {
        view = ErrorView({ message: 'Anime screening was not found.' });
      } else {
        view = AnimeScreeningDetailView({ viewState, handlers });
      }
      break;

    case 'EXAM_TERM_ADMINISTRATION':

      if (!viewState.anime)
      {
        view = ErrorView({ message: 'Anime screening was not found.' });
      } else {
        view = ExamTermAdministrationView({ viewState, handlers });
      }
      break;

    default:
      view = document.createTextNode(`Unknown view type: ${viewState.type}`);
  }

  root.appendChild(view);

  const { notification } = state.ui;

  if (notification)
  {
    const notificationElement = document.createElement('div');
    notificationElement.textContent = notification.message;
    notificationElement.classList.add('notification');
    root.appendChild(notificationElement);
  }
}
