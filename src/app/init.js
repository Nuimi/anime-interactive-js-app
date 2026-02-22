// src/app/init.js

import { createInitialState } from './state.js';
import { createStore } from '../infra/store/createStore.js';
import { createDispatcher } from './dispatch.js';
import { render } from '../ui/render.js';
import * as examTermsApi from '../api/examTermsApi.js';
import { urlToAction } from '../infra/router/router.js';

// 1. inicializace infrastruktury aplikace
const store = createStore(createInitialState());
const dispatch = createDispatcher(store, examTermsApi);

// 2. napojení výstupu aplikace
const root = document.getElementById('app');

// přihlášení renderu ke změnám
// argument dispatch je funkce
store.subscribe((state) => render(root, state, dispatch));

// 3. aplikační incializace stavu
// examTermsApi je objekt s funkcemi
dispatch({ type: 'APP_INIT' });

// 4. naslouchání změnám v řádku s adresou
window.addEventListener('popstate', () => {
  const action = urlToAction(window.location.href);
  dispatch(action);
});
