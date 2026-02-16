
import { createTitle } from "../builder/components/title.js";
import { createText } from "../builder/components/text.js";
import { createDiv } from "../builder/components/div.js";
import { createButton } from "../builder/components/button.js";

export function ErrorView({ message, handlers })
{
  const { onContinue } = handlers;
  return createDiv('', [
      createTitle(1, 'Error'),
      createText( message),
      button(onContinue)
    ]
  );
}
function button(onContinue)
{
  const btn = createButton('button--primary', 'Continue');
  btn.addEventListener('click', onContinue);
  return btn;
}
