import { createInitialState } from '../../src/app/state.js';
import { assert } from "../support/assert.js";

import * as CONST from '../../src/constants.js';

export function testInitialState()
{
  const state = createInitialState();
  assert(Array.isArray(state.exams), 'exams je pole');
  assert(Array.isArray(state.registrations), 'registrations je pole');
  assert(state.ui.mode === CONST.EXAM_LIST, 'výchozí mode je EXAM_TERM_LIST');
}
