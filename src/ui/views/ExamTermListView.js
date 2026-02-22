import { createSection } from "../builder/components/section.js";
import { createTitle } from "../builder/components/title.js";
import { createButton } from "../builder/components/button.js";
import { createCard } from "../builder/layout/card.js";
import { addButton } from "./common.js";

export function ExamTermListView({ viewState, handlers })
{
  const { exams, capabilities } = viewState;
  const { canEnterDetail, canEnterAdministration, canCreateExam } = capabilities;
  const { onEnterDetail, onEnterAdministration, onCreateExamTerm } = handlers;

  const cards = createSection( 'cards');

  exams.forEach((exam) =>
    {
      const card = createCard({
        title: exam.name,
        date: exam.date,
        state: `State: ${exam.status}`,
        signed: `Capacity: ${exam.registeredCount} / ${exam.capacity}`,
        button: [
          addButton( canEnterDetail, onEnterDetail, () => onEnterDetail(exam.id), 'Detail', 'button--primary'),
          addButton( canEnterAdministration, onEnterAdministration, () => onEnterAdministration(exam.id), 'Administration', 'button--success')
        ]
      });
      cards.appendChild(card);
    }
  );

  return createSection('', [
        createTitle(1, 'Exam terms'),
        cards,
        newEntry(canCreateExam, onCreateExamTerm)
      ]
  );
}

function newEntry(canCreateExam, onCreateExamTerm)
{
  if (canCreateExam && onCreateExamTerm)
  {
    const btn = createButton('button--primary mt-15', 'Create new entry');
    btn.addEventListener('click', () =>
      onCreateExamTerm(
        {
          name: 'Nový zkouškový termín',
          date: '2026-01-01T10:00',
          capacity: 10,
        }
      ),
    );
    return btn;
  }
}