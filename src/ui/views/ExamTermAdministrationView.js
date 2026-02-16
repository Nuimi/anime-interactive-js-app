// src/ui/views/ExamTermAdministrationView.js

export function ExamTermAdministrationView({ viewState, handlers }) {
  const { exam, capabilities } = viewState;

  const container = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = `Administrace zkouškového termínu: ${exam.name ?? exam.id}`;
  container.appendChild(title);

  const { canUpdateCapacity, canUpdate, canCancel, canDelete, canBackToList } = capabilities;
  const { onUpdateCapacity, onUpdate, onCancel, onDelete, onBackToList } = handlers;

  /**
   * Zpět na seznam
   */

  if (canBackToList && onBackToList) {
    const btn = document.createElement('button');
    btn.textContent = 'Zpět na seznam';
    btn.addEventListener('click', onBackToList);
    container.appendChild(btn);
  }

  if (!exam) {
    const msg = document.createElement('p');
    msg.textContent = 'Termín nebyl nalezen';
    container.appendChild(msg);
    return container;
  }

  /*
   * aktualizace kapacity
   */
  let capacityInput = null;

  if (canUpdateCapacity && onUpdateCapacity) {
    capacityInput = document.createElement('input');
    capacityInput.type = 'number';
    capacityInput.value = exam.capacity;
    capacityInput.min = '0';

    const btn = document.createElement('button');
    btn.textContent = 'Upravit kapacitu';
    btn.addEventListener('click', () => onUpdateCapacity(Number(capacityInput.value)));

    container.appendChild(capacityInput);
    container.appendChild(btn);
  }

  /**
   * editace dalších údajů
   */
  if (canUpdate && onUpdate) {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = exam.name ?? '';

    const dateInput = document.createElement('input');
    dateInput.type = 'datetime-local';
    dateInput.value = exam.date ?? '';

    const btn = document.createElement('button');
    btn.textContent = 'Uložit';
    btn.addEventListener('click', () => onUpdate({ name: nameInput.value, date: dateInput.value }));

    container.appendChild(nameInput);
    container.appendChild(dateInput);
    container.appendChild(btn);
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

  /**
   * Delete
   */
  if (canDelete && onDelete) {
    const btn = document.createElement('button');
    btn.textContent = 'Smazat';
    btn.addEventListener('click', onDelete);
    container.appendChild(btn);
  }

  return container;
}
