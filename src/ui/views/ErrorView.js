export function ErrorView({ message, handlers }) {
  console.log('handlers in ErrorView:', handlers);
  const root = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.textContent = 'Chyba';

  const p = document.createElement('p');
  p.textContent = message;

  const button = document.createElement('button');
  button.textContent = 'Pokračovat';
  button.addEventListener('click', () => handlers.onContinue());

  root.appendChild(h1);
  root.appendChild(p);
  root.appendChild(button);
  return root;
}
