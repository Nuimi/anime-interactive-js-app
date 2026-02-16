// src/app/state.js
/*
UI state contract
=================
state.ui = {
  status: 'READY' | 'LOADING' | 'ERROR',
  errorMessage: null | string,
};
READY -> LOADING -> READY
READY -> ERROR
*/

// FP
// funkce bez vedlejších efektů
// žádná globální proměnná
export function createInitialState() {
  return {
    // ====== domain data =======
    animeScreening: [],
    registrations: [],
    evaluations: [],

    // ====== identity (temporary, simplified) ======
    currentUser: { userId: 'teacher-1' }, // možné hodnoty "student-1", "teacher-1"
    auth: { role: 'TEACHER' }, // možné hodnoty "ANONYMOUS", "STUDENT", "TEACHER

    // ====== UI state =========
    ui: {
      status: 'READY',
      errorMessage: null,
    },
  };
}
