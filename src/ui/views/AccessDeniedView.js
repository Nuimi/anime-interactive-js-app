export function AccessDeniedView() {
  const root = document.createElement("div");

  const h1 = document.createElement("h1");
  h1.textContent = "Přístup odepřen...";

  root.appendChild(h1);
  return root;
}
