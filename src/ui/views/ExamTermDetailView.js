import { createText } from "../builder/components/text.js";
import { createTitle } from "../builder/components/title.js";
import { createDiv } from "../builder/components/div.js";
import { canGoBack, addActionButton } from "./common.js";

export function ExamTermDetailView({ viewState, handlers })
{
  const { exam, capabilities } = viewState;
  const { canRegister, canUnregister, canPublish, canUnpublish, canCancel, canDelete, canEnterAdministration, canBackToList} = capabilities;
  const { onRegister, onUnregister, onPublish, onUnpublish, onCancel, onDelete, onEnterAdministration, onBackToList } = handlers;

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

  if (canCancel && onCancel) {
    const btn = document.createElement('button');
    btn.textContent = 'Zrušit';
    btn.addEventListener('click', onCancel);
    container.appendChild(btn);
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
