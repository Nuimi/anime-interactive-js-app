import { createInitialState } from '../src/app/state.js';
import * as CONST from '../src/constants.js';

/*
 * Pomocná funkce
 */
function assert(condition, message) {
  if (!condition) {
    console.error('❌ TEST FAILED:', message);
  } else {
    console.log('✅', message);
  }
}

/*
 * Test 1 – počáteční stav
 */
function testInitialState() {
  const state = createInitialState();
console.log(state.ui)
  assert(Array.isArray(state.exams), 'exams je pole');
  assert(Array.isArray(state.registrations), 'registrations je pole');
  assert(state.ui.mode === CONST.EXAM_LIST, 'výchozí mode je EXAM_TERM_LIST');
}

/*
 * Spuštění všech testů
 */
function runAllTests() {
  console.log('--- Spouštím testy ---');
  testInitialState();
  console.log('--- Konec testů ---');
}

runAllTests();
