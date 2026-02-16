import { createInitialState } from '../src/app/state.js';

/*
 * Pomocná funkce
 */
function assert(condition, message)
{
  if (!condition) {
    console.error('❌ TEST FAILED:', message);
  } else {
    console.log('✅', message);
  }
}

/*
 * Test 1 – počáteční stav
 */
function testInitialState()
{
  const state = createInitialState();

  console.log(state);
  const role = 'TEACHERe'

  assert(Array.isArray(state.animeScreening), 'exams je pole');
  assert(Array.isArray(state.registrations), 'registrations je pole');
  assert(state.ui.status === 'READY', 'výchozí stav je READY');
  assert(state.auth.role === role, 'možná role je ' + role);
}

/*
 * Spuštění všech testů
 */
function runAllTests()
{
  console.log('--- Spouštím testy ---');
  testInitialState();
  console.log('--- Konec testů ---');
}

runAllTests();
