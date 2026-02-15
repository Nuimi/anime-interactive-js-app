// src/ui/views/ExamTermAdministrationView.js

export function ExamTermAdministrationView({ viewState, handlers }) {
  const { exam, canPublish, canUnpublish, canCancel, canEdit } = viewState;

  const root = document.createElement("section");
  root.className = "exam-term-administration";

  if (!exam) {
    root.textContent = "Zkouškový termín nebyl nalezen.";
    return root;
  }

  // === Nadpis ===
  const heading = document.createElement("h2");
  heading.textContent = `Správa termínu: ${exam.title}`;
  root.appendChild(heading);

  // === Základní informace ===
  const info = document.createElement("div");
  info.className = "exam-info";

  info.appendChild(createInfoRow("Stav", exam.status));
  info.appendChild(createInfoRow("Kapacita", exam.capacity));
  info.appendChild(createInfoRow("Přihlášeno", exam.registeredCount));

  root.appendChild(info);

  // === Akční tlačítka ===
  const actions = document.createElement("div");
  actions.className = "exam-actions";

  if (canPublish) {
    actions.appendChild(createButton("Publikovat", handlers.publish));
  }

  if (canUnpublish) {
    actions.appendChild(createButton("Zneveřejnit", handlers.unpublish));
  }

  if (canEdit) {
    actions.appendChild(createButton("Upravit", handlers.edit));
  }

  if (canCancel) {
    actions.appendChild(
      createButton("Zrušit termín", handlers.cancel, "danger"),
    );
  }

  root.appendChild(actions);

  return root;
}

/* ===== Pomocné funkce ===== */

function createInfoRow(label, value) {
  const row = document.createElement("div");
  row.className = "info-row";

  const key = document.createElement("span");
  key.className = "info-label";
  key.textContent = `${label}: `;

  const val = document.createElement("strong");
  val.textContent = value;

  row.appendChild(key);
  row.appendChild(val);

  return row;
}

function createButton(label, onClick, variant = "default") {
  const button = document.createElement("button");
  button.textContent = label;
  button.type = "button";
  button.className = `btn btn-${variant}`;
  button.addEventListener("click", onClick);
  return button;
}
