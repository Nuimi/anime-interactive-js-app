// src/app/dispatch.js
// Předpoklady v chování: uživatel nekliká zběsile rychle, nevolá REGISTER_FOR_EXAM5x za sebou - skutečné aplikace by to řešily

import { appInit } from './appInit.js';

import { enterExamTermList } from './actions/enterExamTermList.js';
import { enterExamTermDetail } from './actions/enterExamTermDetail.js';
import { enterExamTermAdministration } from './actions/enterExamTermAdministration.js';

import { createExamTerm } from './actions/createExamTerm.js';
import { publishExamTerm } from './actions/publishExamTerm.js';
import { unpublishExamTerm } from './actions/unpublishExamTerm.js';
import { updateExamCapacity } from './actions/updateExamCapacity.js';
import { updateExamTerm } from './actions/updateExamTerm.js';
import { cancelExamTerm } from './actions/cancelExamTerm.js';
import { deleteExamTerm } from './actions/deleteExamTerm.js';
import { unregisterStudentFromExam } from "./actions/unregisterStudentFromExam.js";

import { registerForExam } from './actions/registerForExam.js';
import { unregisterFromExam } from './actions/unregisterFromExam.js';

import * as CONST from '../constants.js';

/**
 * Vytvoří funkci dispatch, která podle typu akce vrací výsledek výkonného kódu akce.
 * Příklad:
 * pro typ akce 'ENTER_EXAM_TERM_DETAIL'
   bude funke dispatch vracet výsledek funkce enterExamTermDetail({ store, payload: action.payload })
 *
 */
export function createDispatcher(store, api) {
  return async function dispatch(action) {
    // výchozí hodnota payload bude {}, pokud payload není v action definován
    // pokud action obsahuje payload, bude payload = action.payload
    // pokud action je null nebo undefined, použijeme se místo ní {}
    const { type, payload = {} } = action ?? {};

    switch (type) {
      // inicializace
      case 'APP_INIT':
        return appInit({ store, api, dispatch });

      // navigační akce
      case CONST.ENTER_LIST:
        return enterExamTermList({ store });

      case CONST.ENTER_DETAIL:
        return enterExamTermDetail({ store, payload });

      case CONST.ENTER_ADMIN:
        return enterExamTermAdministration({ store, payload });

      // doménové akce

      case CONST.CREATE:
        return createExamTerm({ store, api, payload });

      case CONST.PUBLISH:
        return publishExamTerm({ store, api, payload });

      case CONST.UNPUBLISH:
        return unpublishExamTerm({ store, api, payload });

      case CONST.UPDATE_CAPACITY:
        // předáváme payload: { examId, capacity }
        return updateExamCapacity({ store, api, payload });

      case CONST.UPDATE_TERM:
        // předáváme payload: { examId, data }
        return updateExamTerm({ store, api, payload });

      case CONST.CANCEL:
        return cancelExamTerm({ store, api, payload });

      case CONST.DELETE:
        return deleteExamTerm({ store, api, payload });

      case CONST.REGISTER_F_EXAM:
        return registerForExam({ store, api, payload });

      case CONST.UNREGISTER_F_EXAM:
        return unregisterFromExam({ store, api, payload });

      case CONST.UNREGISTER_STUDENT:
        return unregisterStudentFromExam({ store, api, payload });

      default:
        console.warn(`Unknown action type: ${type}`);
    }
  };
}
