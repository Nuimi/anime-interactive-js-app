
import { getExamData } from "./examList.js";
import { getRegistrationData } from "./registrations.js";
import { getUsersData } from "./users.js";

export function createMockDatabase() {
  return {
    // ==================
    // Mock * databáze *
    // ==================

    exams: getExamData(),
    registrations: getRegistrationData(),
    users: getUsersData(),

    scheduleEvents: [],
    enrollments: [],
  };
}
