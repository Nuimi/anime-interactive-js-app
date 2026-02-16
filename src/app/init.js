// src/app/init.js

import { createInitialState } from './state.js';
import { createStore } from '../infra/store/createStore.js';
import { createDispatcher } from './dispatch.js';
import { render } from '../ui/render.js';
import * as animeScreeningApi from '../api/animeScreeningApi.js';
import { appInit } from './appInit.js';
import { urlToAction } from '../infra/router/router.js';


// 1. inicializace infrastrukturyaplikace
const store = createStore(createInitialState());
const dispatch = createDispatcher(store, animeScreeningApi);

// 2. napojení výstupu aplikace
const root = document.getElementById('app');

// přihlášení renderu ke změnám
store.subscribe((state) => render(root, state, dispatch));

// 3. aplikační incializace stavu
appInit(store, animeScreeningApi);

// 4. prvotní navigace
const initialAction = urlToAction(window.location.href);
console.log('[router] url ToAction -> ', initialAction);
dispatch(initialAction);

// naslouchání změnám v řádku s adresou
window.addEventListener('hashchange', () =>
  {
    const action = urlToAction(window.location.href);
    console.log('[router] url ToAction -> ', action);
    dispatch(action);
  }
);
