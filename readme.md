# Spuštění projektu

## Požadavky

- Webový prohlížeč (Chrome, Firefox)
- Rozšíření **Live Server** (VS Code) nebo jiný statický HTTP server

Projekt **nelze** spouštět otevřením souboru `index.html` přímo z disku (`file://`).

---

## Postup spuštění

1. Otevřete kořen projektu ve VS Code  
   (adresář, kde se nachází `index.html`).

2. Klikněte pravým tlačítkem na `index.html`.

3. Zvolte **Open with Live Server**.

4. Prohlížeč se otevře automaticky, typicky na adrese:

```
http://127.0.0.1:5500/
```

---

## Nastavení role uživatele (důležité)

Role uživatele se nyní nastavuje při inicializaci aplikace v souboru:

```
src/app/appInit.js
```

Ve funkci `appInit` naleznete řádek s definicí tokenu:

```js
const token = 'student-1_12345678';
// const token = 'teacher-1_25893255';
```

Pro změnu role:

- ponechte **odkomentovaný pouze jeden token**
- druhý token zakomentujte
- uložte soubor
- obnovte stránku v prohlížeči

Token určuje roli uživatele. Backend z něj odvodí `userId` a `role`.

Dostupné varianty:

- student
- učitel

Aplikace se při každém obnovení stránky znovu inicializuje podle zvoleného tokenu.

---

## Správná URL aplikace

Aplikace používá **hash-based routing**.

To znamená:

- funkční URL obsahují znak `#`
- server nikdy neřeší cesty za `#`
- navigace probíhá výhradně na straně aplikace

### Správné příklady:

```
http://127.0.0.1:5500/#/exam-terms
http://127.0.0.1:5500/#/exam-terms/e1
http://127.0.0.1:5500/#/exam-terms/e1/edit
```

### Nesprávné (vede k chybě 404):

```
http://127.0.0.1:5500/exam-terms
```

---

## Co se děje po spuštění

Po otevření aplikace:

1. Spustí se akce `APP_INIT`
2. Backend na základě tokenu vrátí roli a identitu uživatele
3. Načtou se zkouškové termíny a registrace
4. Aplikace přejde do stavu `READY`
5. Router vyhodnotí URL a nastaví odpovídající kontext

---

# Spouštění testů v terminálu

Testy jsou spouštěny přímo pomocí **Node.js** bez použití testovacího frameworku.  
Výstupem testů jsou zprávy vypsané do konzole.

---

## Požadavky

- Nainstalovaný **Node.js** (doporučeno verze 18 a vyšší)

Ověření instalace:

```bash
node -v
```

Pokud se zobrazí číslo verze, je Node připraven.

---

## Umístění testů

Testy jsou uloženy ve složce tests (sourozenecké se složkou src):

```
tests/
```

Například:

```
tests/stateTests.mjs
```

---

## Spuštění testu

1. Otevřete terminál v kořenové složce projektu  
   (tam, kde je adresář `src/` a `tests/`).

2. Spusťte konkrétní test:

```bash
node tests/stateTests.mjs
```

---

## Jak vypadá výstup

Testy vypisují informace do konzole:

- ✅ Test prošel
- ❌ Test selhal
- konkrétní hodnoty proměnných

Například:

```
Test 1: Počáteční stav obsahuje prázdné pole exams
OK
```

nebo

```
Test 2: Kapacita je nastavena na 10
FAILED – očekáváno 10, nalezeno 0
```

---

## Důležité poznámky

- Testy **nepoužívají DOM**
- Testy **nepoužívají render**
- Testují pouze:
  - stav
  - selektory
  - akce
  - dispatcher

---

## Doporučený postup práce

1. Nejprve spusťte test.
2. Pokud selže, upravte implementaci.
3. Spusťte test znovu.
4. Opakujte, dokud test neprojde.

Tímto způsobem se učíte:

- číst stav jako data
- ověřovat logiku bez UI
- pracovat systematicky

---

## Typické chyby

- spuštění bez přípony `.mjs`
- spuštění z jiného adresáře
- chybně napsaná relativní cesta v importu

Pokud Node hlásí chybu typu `Cannot find module`, zkontrolujte:

- zda jste ve správné složce
- zda je cesta v `import` správná
