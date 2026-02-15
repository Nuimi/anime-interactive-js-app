// src/app/dispatch.js
// Předpoklady v chování: uživatel nekliká zběsile rychle, nevolá REGISTER_FOR_EXAM5x za sebou - skutečné aplikace by to řešily

import { unregisterFromExam } from './actions/unregisterFromExam.js';
import { cancelExamTerm } from './actions/cancelExamTerm.js';
import { registerForExam } from './actions/registerForExam.js';
import { recoverFromError } from './actions/recoverFromError.js';
import { startExamTermEdit } from './actions/startExamTermEdit.js';
import { updateExamCapacity } from './actions/updateExamCapacity.js';
import { cancelExamTermEdit } from './actions/cancelExamTermEdit.js';
import { enterAnimeScreening } from './actions/enterAnimeScreening.js';
import { enterAnime } from './actions/enterAnime.js';
import { enterExamTermAdministration } from './actions/enterExamTermAdministration.js';
//import { loadexams } from './loadexams.js';
//import { appInit } from "./appInit.js";

export function createDispatcher(store, api) {
  return async function dispatch(action) {
    console.log('[dispatch] action -> ', action);

    switch (action.type) {
      //case "APP_INIT":
      //  return appInit(store, api);

      // navigační akce
      case 'ENTER_ANIME_SCREENING':
        return enterAnimeScreening({ store });

      case 'ENTER_ANIME':
        return enterAnime({ store, payload: action.payload });

      case 'ENTER_EXAM_TERM_ADMINISTRATION':
        return enterExamTermAdministration({ store, payload: action.payload });

      // doménové akce
      case 'RECOVER_FROM_ERROR':
        return recoverFromError({ store });

      case 'REGISTER_FOR_EXAM_TERM':
        return registerForExam({ store, api, payload: action.payload });

      case 'CANCEL_EXAM_TERM':
        return cancelExamTerm({ store, api, payload: action.payload });

      case 'UNREGISTER_FROM_EXAM':
        return unregisterFromExam({ store, api, payload: action.payload });

      case 'START_EXAM_TERM_EDIT':
        return startExamTermEdit({ store, payload: action.payload });

      case 'UPDATE_EXAM_CAPACITY':
        // předáváme payload: { examId, capacity }
        return updateExamCapacity({ store, api, payload: action.payload });

      case 'CANCEL_CHANGES':
        // nepředáváme žadný payload
        return cancelExamTermEdit({ store });

      default:
        console.warn(`Unknown action type: ${action.type}`);
    }
  };
}
