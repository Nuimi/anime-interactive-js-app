import { createTitle } from "../builder/components/title.js";
import { createDiv } from "../builder/components/div.js";

export function LoadingView()
{
  return createDiv('', [createTitle(1,'Loading')]);
}
