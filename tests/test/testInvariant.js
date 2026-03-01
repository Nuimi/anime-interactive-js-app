// tests/testInvariant.js
import { createStore } from "../../src/infra/store/createStore.js";
import { createInitialState } from "../../src/app/state.js";
import { fakeStatusSuccess } from "../support/fake.js";
import { assert } from "../support/assert.js";

export async function testInvariant() {
  const initialState = createInitialState();

  initialState.scheduleEvents = [
    { id: "e1", capacity: 1, registeredCount: 1, status: "OPEN" },
  ];
  initialState.enrollments = [];
  initialState.auth = { userId: "s2", role: "STUDENT", token: "x" };

  const fakeApi = {
    enroll: async () => ({
      status: "REJECTED",
      reason: "Kapacita naplněna",
    }),
  };

  const store = createStore(initialState);

  await fakeStatusSuccess({
    store,
    api: fakeApi,
    payload: { eventId: "e1" },
  });

  const state = store.getState();

  assert(state.enrollments.length === 0, "Nepřibylo žádné enrollment");
  assert(
    state.scheduleEvents[0].registeredCount === 1,
    "Kapacita nebyla změněna",
  );
}
