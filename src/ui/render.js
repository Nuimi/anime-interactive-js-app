// src/ui/render.js

import { selectViewState } from '../infra/store/selectors.js';
import { createAnimeScreeningHandlers } from '../app/actionHandlers/animeScreeningHandlers.js';

import { LoadingView } from './views/LoadingView.js';
import { ErrorView } from './views/ErrorView.js';
import { AnimeListView } from './views/AnimeListView.js';
import { AnimeScreeningDetailView } from './views/AnimeScreeningDetailView.js';
import { ExamTermAdministrationView } from './views/ExamTermAdministrationView.js';

export function render(root, state, dispatch) {
  root.replaceChildren();

  const viewState = selectViewState(state);

  const handlers = createAnimeScreeningHandlers(dispatch, viewState);

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
      view = AnimeScreeningDetailView({ viewState, handlers });
      break;

    case 'EXAM_TERM_ADMINISTRATION':
      view = ExamTermAdministrationView({ viewState, handlers });
      break;

    default:
      view = document.createTextNode(`Unknown view type: ${viewState.type}`);
  }

  root.appendChild(view);
}
