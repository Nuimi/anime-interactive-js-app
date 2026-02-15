import { createSection } from "../builder/components/section.js";
import { createText } from "../builder/components/text.js";
import { createTitle } from "../builder/components/title.js";
import { createDiv } from "../builder/components/div.js";
import {createButton} from "../builder/components/button.js";
import { createCard } from "../builder/layout/cardSmall.js";

export function AnimeScreeningDetailView({ viewState, handlers })
{
  if (!viewState.anime)
  {
    return createSection('', [createText('Anime screening was not found.')]);
  }

  const root = createSection('', [
      createTitle(1, viewState.anime.name),
      createDiv('', [
            createText(`State: ${viewState.anime.status}`),
            createText(`Capacity: ${viewState.anime.registeredCount} / ${viewState.anime.capacity}`),
            createText(`Date: ${viewState.anime.date}`),
          ]
      )
    ]
  );

  if (viewState.registrations)
  {
    root.appendChild(renderRegistrations(viewState.registrations));
  }

  const actions = renderActions(viewState, handlers);
  if (actions)
  {
    root.appendChild(actions);
  }

  return root;
}

function renderRegistrations(registrations)
{
  const section = createSection('', [createTitle(3, 'Registration')]);

  if (registrations.length === 0)
  {
    section.appendChild(createText('No registrations found.'));
    return section;
  }

  const cards = createSection( 'cards mb-15');
  registrations.forEach((r) =>
    {
      cards.appendChild(createCard(
          {
            title: r.userId,
            description: r.status
          }
        )
      );
    }
  );

  section.appendChild(cards);
  return section;
}

function renderActions(viewState, handlers) {
  const actions = createDiv();

  let hasAnyAction = false;

  if (handlers.register)
  {
    actions.appendChild(button('Register', 'button--success', handlers.register));
    hasAnyAction = true;
  }

  if (handlers.unregister)
  {
    actions.appendChild(button('Unregister', 'button--danger', handlers.unregister));
    hasAnyAction = true;
  }

  if (handlers.publish)
  {
    actions.appendChild(button('Publish', 'button--success', handlers.publish));
    hasAnyAction = true;
  }

  if (handlers.unpublish)
  {
    actions.appendChild(button('Unpublish', 'button--danger', handlers.unpublish));
    hasAnyAction = true;
  }

  if (handlers.cancel)
  {
    actions.appendChild(button('Cancel', 'button--danger', handlers.cancel));
    hasAnyAction = true;
  }

  if (handlers.edit)
  {
    actions.appendChild(button('Edit', 'button--success', handlers.edit));
    hasAnyAction = true;
  }

  if (handlers.backToList)
  {
    actions.appendChild(button('Back to list', 'button--primary', handlers.backToList));
    hasAnyAction = true;
  }

  if (!hasAnyAction) return null;
  return actions;
}

function button(label, type, onClick)
{
  const btn = createButton(type, label);
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}
