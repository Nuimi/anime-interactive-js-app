import { createMockDatabase } from "./database/data.js";
import { createAuthApi } from "./authApi.js";
import { createExamTermsApi } from "./examTermsApi.js";
import { createScheduleEventsApi } from "./scheduleEventsApi.js";

export function createApi() {
  const db = createMockDatabase();
  return {
    auth: createAuthApi(db),
    examTerms: createExamTermsApi(db),
    scheduleEvents: createScheduleEventsApi(db),
  };
}
