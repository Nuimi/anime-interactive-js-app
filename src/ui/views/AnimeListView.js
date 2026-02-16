import { createSection } from "../builder/components/section.js";
import { createTitle } from "../builder/components/title.js";
import { createText } from "../builder/components/text.js";
import { createButton } from "../builder/components/button.js";
import { createDiv } from "../builder/components/div.js";
import { createCard } from "../builder/layout/card.js";

export function AnimeListView({ viewState, handlers })
{
  const { animeList, capabilities } = viewState;
  const root = createSection('', [
      createTitle(1, 'Anime screenings'),
      renderAnimeScreening(animeList, handlers, capabilities)
    ]
  );


  const actions = renderActions(handlers);
  if (actions) {
    root.appendChild(actions);
  }

  return root;
}

function renderAnimeScreening(anime, handlers, capabilities)
{

  // const { canEnterDetail, canEnterAdministration, canCreateExam } = capabilities;
  const { enterDetail, onEnterAdministration, onCreateExamTerm } = handlers;
  const cards = createSection( 'cards');

  anime.forEach((anime) =>
    {
      if (handlers.enterDetail)
      {
        const data = {
             title: anime.name,
             description: `State of ordering: ${anime.status}`,
             description2: `Capacity: ${anime.registeredCount} / ${anime.capacity}`,
             button: [
                buttonDetail( () => enterDetail(anime.id)),
                buttonAdmin( () => onEnterAdministration(anime.id))
               ]
           };
        const card = createCard(data);
        cards.appendChild(card);
      }

    }
  );

  return cards;
}

function renderActions(handlers)
{
  if (!handlers.createExamTerm) return null;
  const div = document.createElement('div');
  div.appendChild(button('Create new anime screening', handlers.createExamTerm));

  return div;
}

function buttonDetail( onClick)
{
  const btn = createButton('button--primary', 'Detail');
  btn.addEventListener('click', onClick);
  return createDiv('text-center', [btn]);
}

function buttonAdmin( onClick)
{
  const btn = createButton('button--success', 'Admin');
  btn.addEventListener('click', onClick);
  return createDiv('text-center', [btn]);
}
