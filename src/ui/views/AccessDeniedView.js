import { createTitle } from "../builder/components/title.js";
import { createDiv } from "../builder/components/div.js";
export function AccessDeniedView()
{
  return createDiv('', [createTitle(1,'Access denied')]);
}
