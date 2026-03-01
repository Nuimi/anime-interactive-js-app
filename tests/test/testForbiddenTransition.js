// tests/testForbiddenTransition.js

import { createStore } from "../../src/infra/store/createStore.js";
import { createInitialState } from "../../src/app/state.js";
import { fakeStatusSuccess } from "../support/fake.js";
import { assert } from "../support/assert.js";

export async function testForbiddenTransition() {
  const initialState = createInitialState();

  initialState.scheduleEvents = [
    { id: "e1", status: "OPEN", registeredCount: 0 },
  ];
  initialState.auth = { userId: "t1", role: "TEACHER", token: "x" };

  const fakeApi = {
    cancelScheduleEvent: async () => ({
      status: "REJECTED",
      reason: "Již zrušeno",
    }),
  };

  const store = createStore(initialState);

  await fakeStatusSuccess({
    store,
    api: fakeApi,
    payload: { eventId: "e1" },
  });

  const state = store.getState();

  assert(
    state.scheduleEvents[0].status === "CANCELED",
    "Nepovolený přechod nemění stav",
  );
}
