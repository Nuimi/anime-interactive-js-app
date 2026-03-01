import { createText } from "../builder/components/text.js";
import { createTitle } from "../builder/components/title.js";
import { createDiv } from "../builder/components/div.js";
import {canGoBack, addActionButton, addButton} from "./common.js";
import {createCard} from "../builder/layout/cardSmall.js";
import {createSection} from "../builder/components/section.js";
import * as STATUS from "../../statuses.js";

export function ExamTermDetailView({ viewState, handlers })
{
  const { exam, capabilities, registered } = viewState;
  const { canRegister, canUnregister, canPublish, canUnpublish, canCancel, canDelete, canEnterAdministration, canBackToList, canUnregisterStudent} = capabilities;
  const { onRegister, onUnregister, onPublish, onUnpublish, onCancel, onDelete, onEnterAdministration, onBackToList, onUnregisterStudent } = handlers;

  const container = createDiv();
  container.appendChild(canGoBack(canBackToList, onBackToList));

  if (!exam)
  {
    container.appendChild(createText('Term was not found'));
    return container;
  }

  container.appendChild(createTitle(2, `Detail of ${exam.name ?? exam.id}`));
  container.appendChild(createText(`Datum: ${exam.date}`));
  container.appendChild(createText(`State: ${exam.status}`));
  container.appendChild(createText(`Capacity: ${exam.capacity}`));
  container.appendChild(createText(`Number of students: ${exam.registeredCount}`));

  const cards = createSection( 'cards mb-15');
  registered.forEach((user) =>
      {
        let btn = '';
        if (user.status === STATUS.REG )
        {
          btn = addButton( canUnregisterStudent, onUnregisterStudent, () => onUnregisterStudent(user.userId), 'Unregister', 'button--danger')
        }
        const card = createCard({
          title: user.userId,
          description: `State: ${user.status}`,
          button: btn,
        });
        cards.appendChild(card);
      }
  );
  container.appendChild(cards);

  /**
   * Student
   */
  if (canRegister && onRegister)
  {
    container.appendChild(addActionButton(onRegister, 'Register', 'button--success'));
  }

  if (canUnregister && onUnregister)
  {
    container.appendChild(addActionButton(onUnregister, 'Unregister', 'button--danger'));
  }

  /**
   * Teacher - stavové přechody
   */
  if (canUnpublish && onUnpublish)
  {
    container.appendChild(addActionButton(onUnpublish, 'Make not public', 'button--danger'));
  }

  if (canPublish && onPublish)
  {
    container.appendChild(addActionButton(onPublish, 'Make public', 'button--success'));
  }

  if (canCancel && onCancel)
  {
    container.appendChild(addActionButton(onCancel, 'Cancel', 'button--danger'));
  }

  if (canDelete && onDelete)
  {
    container.appendChild(addActionButton(onDelete, 'Delete', 'button--danger'));
  }

  if (canEnterAdministration && onEnterAdministration)
  {
    container.appendChild(addActionButton(onEnterAdministration, 'Administration', 'button--success'));
  }

  return container;
}
