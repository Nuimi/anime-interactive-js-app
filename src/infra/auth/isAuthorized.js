export function isAuthorized(viewType, role) {
  switch (viewType) {
    case "EXAM_TERM_REGISTRATION":
      return role === "STUDENT";

    case "EXAM_TERM_ADMINISTRATION":
      return role === "TEACHER";

    default:
      return true;
  }
}
