import {createDiv} from "../builder/components/div.js";
import {canGoBack, submitButton, addActionButton} from "./common.js";
import { createTitle } from "../builder/components/title.js";
import { createText } from "../builder/components/text.js";
import { createInput } from "../builder/components/input.js";

export function ExamTermAdministrationView({ viewState, handlers })
{
  const { exam, capabilities } = viewState;
  const { canUpdateCapacity, canUpdate, canCancel, canDelete, canBackToList } = capabilities;
  const { onUpdateCapacity, onUpdate, onCancel, onDelete, onBackToList } = handlers;


  const root = createDiv();
  root.appendChild(canGoBack(canBackToList, onBackToList));
  const container = createDiv('text-center w-25');
  container.appendChild(createTitle(1, `Administration of: ${exam.name ?? exam.id}`));

  if (!exam)
  {
    container.appendChild(createText('Term was not found'));
    return container;
  }

  if (canUpdateCapacity && onUpdateCapacity)
  {
    let capacityInput = createInput('', {
          type: 'number',
          value: exam.capacity,
          min: 0,
          name: 'examCapacity',
          id: 'examCapacityInput',
        }
    );
    const formCapacity = createDiv('', [
          capacityInput,
          submitButton('Adjust capacity', () => onUpdateCapacity(Number(document.getElementById('examCapacityInput').value)))
        ]
    );

    container.appendChild(formCapacity);
  }

  if (canUpdate && onUpdate)
  {
    let nameInput = createInput('', {
          type: 'text',
          value: exam.name ?? '',
          name: 'examName',
          id: 'examNameInput',
        }
    );
    let dateInput = createInput('', {
          type: 'datetime-local',
          value: exam.date ?? '',
          name: 'examDate',
          id: 'examDateInput',
        }
    );

    const formData = createDiv('', [
          nameInput,
          dateInput,
          submitButton('Save', () => onUpdate({
                name: document.getElementById('examNameInput').value,
                date: document.getElementById('examDateInput').value
              }
            )
          )
        ]
    );
    container.appendChild(formData);
  }

  /**
   * Cancel
   */

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


  root.appendChild(container);
  return root;
}
