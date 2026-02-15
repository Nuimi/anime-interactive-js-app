# Spuštění projektu

## Požadavky

- Webový prohlížeč (Chrome, Firefox)
- Rozšíření **Live Server** (VS Code) nebo jiný statický HTTP server

Projekt **nelze** spouštět otevřením souboru `index.html` přímo z disku (`file://`).

---

## Postup spuštění

1. Otevři kořen projektu ve VS Code  
   (adresář, kde je `index.html`).

2. Klikni pravým tlačítkem na `index.html`.

3. Zvol **Open with Live Server**.

4. Prohlížeč se otevře automaticky, typicky na adrese:

http://127.0.0.1:5500/

---

## Správná URL aplikace

Aplikace používá **hash-based routing**.

To znamená, že:

- funkční URL **obsahují znak `#`**
- server nikdy neřeší cesty za `#`
- veškerá navigace probíhá na straně aplikace

### Správné příklady:

http://127.0.0.1:5500/#/exam-terms
http://127.0.0.1:5500/#/exam-terms/e1
http://127.0.0.1:5500/#/exam-terms/e1/edit

### Nesprávné (povede k chybě 404):

http://127.0.0.1:5500/exam-terms

---

## Proč se po otevření objeví chyba

Po otevření `index.html` bez `#`:

- `window.location.href` neobsahuje routovatelnou cestu
- `parseUrl()` vrátí `UNKNOWN`
- aplikace nemá kam vstoupit

To je **očekávané chování**, nikoli chyba architektury.

---

## Doporučený postup po spuštění

Po načtení stránky ručně nastav URL např. na:

http://127.0.0.1:5500/#/exam-terms

---

## Přepnutí role uživatele

Role uživatele je v této aplikaci **součástí počátečního stavu** a je nastavena v souboru src/app/state.js

Ve funkci `createInitialState()` lze ručně nastavit roli, se kterou se aplikace spustí.

Možné hodnoty role:

- ANONYMOUS
- STUDENT
- TEACHER

Po změně role uložte soubor state.js a obnovte stránku v prohlížeči.

Aplikace se znovu inicializuje s novou rolí a zobrazí odpovídající chování, pohledy a dostupné akce.

---

## Shrnutí

- aplikace je **SPA**
- navigace probíhá přes **hash routing**
- server vždy obsluhuje jen `index.html`
- stav aplikace určuje router, ne server

To je záměr, ne omezení.
