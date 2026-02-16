// src/infra/router/router.js

// --------------------------------------------------
// Router pracuje s LOGICKOU CESTOU aplikace,
// nikoli s celou URL (protokol, host, port ho nezajímají).
//
// Podporované cesty:
//
//   #/exam-terms
//   #/exam-terms/:id
//   #/exam-terms/:id/edit
// --------------------------------------------------

/**
 * Rozebere logickou cestu aplikace na významovou strukturu.
 * @param {string} path – např. "exam-terms/123/edit"
 */
export function parsePath(path)
{
  const parts = path.split('/').filter(Boolean);

  // /exam-terms
  if (parts.length === 1 && parts[0] === 'anime-screening')
  {
    return {
      route: 'ANIME_SCREENING',
    };
  }

  // /exam-terms/:id
  if (parts.length === 2 && parts[0] === 'anime-screening')
  {
    return {
      route: 'ANIME',
      animeId: parts[1],
    };
  }

  // /exam-terms/:id/edit
  if (parts.length === 3 && parts[0] === 'anime-screening' && parts[2] === 'edit')
  {
    return {
      route: 'EXAM_TERM_ADMINISTRATION',
      animeId: parts[1],
    };
  }

  return { route: 'UNKNOWN' };
}

/**
 * Převádí rozpoznanou trasu na aplikační akci.
 */
export function routeToAction(parsed)
{
  switch (parsed.route)
  {
    case 'ANIME_SCREENING':
      return {
        type: 'ENTER_ANIME_SCREENING',
      };

    case 'ANIME':
      return {
        type: 'ENTER_ANIME',
        payload: {
          animeId: parsed.animeId,
        },
      };

    case 'EXAM_TERM_ADMINISTRATION':
      return {
        type: 'ENTER_EXAM_TERM_ADMINISTRATION',
        payload: {
          animeId: parsed.animeId,
        },
      };

    default:
      return {
        type: 'ROUTE_NOT_FOUND',
      };
  }
}

/**
 * Adaptér mezi prohlížečem a routerem.
 * Jediné místo, kde saháme na window.location.
 */
export function urlToAction()
{
  const hash = window.location.hash; // např. "#/exam-terms/123"
  const path = hash.startsWith('#/') ? hash.slice(2) : '';

  console.log('[router] path:', path);

  return routeToAction(parsePath(path));
}
