import * as CONST from '../../constants.js';

// --------------------------------------------------
// Router pracuje s LOGICKOU CESTOU aplikace,
// nikoli s celou URL (protokol, host, port ho nezajímají).
//
// Navigační kontexty jsou:
//
//   #/exam-terms           ... seznam termínů
//   #/exam-terms/:id       ... detail termínu
//   #/exam-terms/:id/edit  ... administrace termínu
// --------------------------------------------------

// URL -> route
// odstraníme # a technické části
export function urlToRoute(url) {
  const hashIndex = url.indexOf("#");
  const path = hashIndex >= 0 ? url.slice(hashIndex + 1) : "";
  return parseUrl(path);
}

// parsování - syntaktická analýza cesty
export function parseUrl(path) {
  const parts = path.split("/").filter(Boolean);

  // #/exam-terms
  if (parts.length === 1 && parts[0] === "exam-terms") {
    return { context: CONST.EXAM_LIST };
  }

  // #/exam-terms/:id
  if (parts.length === 2 && parts[0] === "exam-terms") {
    return {
      context: "EXAM_TERM_DETAIL",
      examId: parts[1],
    };
  }

  // #/exam-terms/:id/edit
  if (parts.length === 3 && parts[0] === "exam-terms" && parts[2] === "edit") {
    return {
      context: "EXAM_TERM_ADMINISTRATION",
      examId: parts[1],
    };
  }

  return { context: "UNKNOWN" };
}

// route -> navigační akce
export function routeToAction(route) {
  switch (route.context) {
    case CONST.EXAM_LIST:
      return { type: CONST.ENTER_LIST };
    case "EXAM_TERM_DETAIL":
      return {
        type: "ENTER_EXAM_TERM_DETAIL",
        payload: { examId: route.examId },
      };
    case "EXAM_TERM_ADMINISTRATION":
      return {
        type: "ENTER_EXAM_TERM_ADMINISTRATION",
        payload: { examId: route.examId },
      };
    case "UNKNOWN":
      return { type: CONST.ENTER_LIST };
  }
}

export function urlToAction(url) {
  const route = urlToRoute(url);
  return routeToAction(route);
}
