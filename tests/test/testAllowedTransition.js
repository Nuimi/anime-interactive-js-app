import { createStore } from "../../src/infra/store/createStore.js";
import { createInitialState } from "../../src/app/state.js";
import { fakeStatusSuccess } from "../support/fake.js";
import { assert } from "../support/assert.js";

export async function testAllowedTransition()
{
  const initialState = createInitialState();

  initialState.scheduleEvents = [
    { id: "e1", status: "CANCELED", registeredCount: 0 },
  ];
  initialState.auth = { userId: "t1", role: "TEACHER", token: "x" };

  const fakeApi = {
    cancelScheduleEvent: async () => ({
      status: "SUCCESS",
      event: { id: "e1", status: "CANCELED", registeredCount: 0 },
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
    "OPEN → CANCELED je povolený přechod",
  );
}
