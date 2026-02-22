/**
 * Mock server API for exams and registrations
 *
 * - simuluje serverovou perzistenci v paměti
 * - simuluje asynchronní chování (latence)
 * - garantuje invarianty (kapacita, existence termínu)
 *
 * Frontend neřeší, jak jsou data ukládána.
 *
 */
import { getExamData } from "./database/examList.js";
import { getRegistrationData } from "./database/registrations.js";
import { getUsersData } from "./database/users.js";

// ==================
// Mock * databáze *
// ==================

let exams = getExamData();

let registrations = getRegistrationData();

const users = getUsersData();

export async function getExams(token) {
  await delay();

  return { status: 'SUCCESS', exams: structuredClone(exams), registrations: structuredClone(registrations) };
}

export async function whoAmI(token) {
  await delay();

  if (!token) {
    return { status: 'REJECTED', reason: 'Uživatel není přihlášený' };
  }

  const user = users.find((u) => u.token === token);

  if (!user) {
    return { status: 'REJECTED', reason: 'Neplatný token' };
  }

  return { status: 'SUCCESS', userId: user.userId, role: user.role };
}

// =================
// helpers
// =================
function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =========================
// API
// =========================

// má vracet { status, reason} nebo { status, exam}
// status = SUCCESS | REJECTED
export async function cancelExamTerm(examId, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'TEACHER') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // doménová logika
  const exam = exams.find((t) => t.id === examId);

  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }

  if (exam.status === 'CANCELED') {
    return {
      status: 'REJECTED',
      reason: 'Termín je již zrušen',
    };
  }

  // je někdo zapsaný na termín?
  const hasRegistrations = registrations.some((r) => r.examId === examId && r.status === 'REGISTERED');

  if (hasRegistrations) {
    return {
      status: 'REJECTED',
      reason: 'Termín obsahuje registrace',
    };
  }

  exam.status = 'CANCELED';

  return { status: 'CANCELED', exam: structuredClone(exam) };
}

// má vracet { status, reason} nebo { status, exam}
// status = SUCCESS | REJECTED
export async function createExamTerm(payload, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'TEACHER') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // doménová logika
  // ************************

  // validace vstupu
  const { name, date, capacity } = payload ?? {};
  if (!name || !date || typeof capacity !== 'number' || !capacity) {
    return {
      status: 'REJECTED',
      reason: 'Neplatná data termínu',
    };
  }

  if (capacity < 0) {
    return {
      status: 'REJECTED',
      reason: 'Neplatná kapacita termínu',
    };
  }

  // vytvoření nového zkouškového termínu
  const exam = {
    id: crypto.randomUUID(),
    name,
    date,
    capacity,
    registeredCount: 0,
    status: 'DRAFT',
  };

  exams.push(exam);

  return { status: 'SUCCESS', exam: structuredClone(exam) };
}

// má vracet { status, reason} nebo { status, exam}
// status = SUCCESS | REJECTED
export async function deleteExamTerm(examId, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'TEACHER') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // doménová logika
  // ecistuje termín?
  const exam = exams.find((e) => e.id === examId);
  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }

  // doménová pravidla
  if (exam.status === 'CANCELED') {
    return {
      status: 'REJECTED',
      reason: 'Termín je již zrušen',
    };
  }

  // existují aktivní registrace?
  const hasRegistrations = registrations.some((r) => r.examId === examId && r.status === 'REGISTERED');

  if (hasRegistrations) {
    return {
      status: 'REJECTED',
      reason: 'Termín obsahuje registrace',
    };
  }

  // skutečné smazání termínu
  exams = exams.filter((e) => e.id !== examId);

  return { status: 'SUCCESS', exam: structuredClone(exam) };
}

// má vracet { status, reason} nebo { status, exam}
// status = SUCCESS | REJECTED
export async function publishExamTerm(examId, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'TEACHER') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // existuje termín?
  const exam = exams.find((e) => e.id === examId);
  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }

  // doménová logika
  if (exam.status === 'CANCELED') {
    return {
      status: 'REJECTED',
      reason: 'Termín je již zrušen',
    };
  }

  if (exam.status === 'PUBLISHED') {
    return {
      status: 'REJECTED',
      reason: 'Termín je již zveřejněn pro zápis',
    };
  }

  // skutečné zveřejnení termínu
  exam.status = 'PUBLISHED';

  return { status: 'SUCCESS', exam: structuredClone(exam) };
}

// má vracet { status, reason} nebo { result, registration, exam }
// status = SUCCESS | REJECTED
export async function registerForExam(examId, userId, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);

  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'STUDENT') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  const verifiedUserId = user.userId;

  // existuje termín?
  const exam = exams.find((e) => e.id === examId);

  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }

  // doménová logika

  if (exam.status !== 'PUBLISHED') {
    return {
      status: 'REJECTED',
      reason: 'Termín není zveřejněn pro zápis',
    };
  }

  if (exam.registeredCount >= exam.capacity) {
    return {
      status: 'REJECTED',
      reason: 'Kapacita termínu je již naplněna',
    };
  }

  const isAlreadyRegistered = registrations.find(
    (r) => r.userId === verifiedUserId && r.examId === examId && r.status === 'REGISTERED',
  );

  if (isAlreadyRegistered) {
    return {
      status: 'REJECTED',
      reason: 'Student je již zaregistrován',
    };
  }

  // skutečné zaregistrování
  const registration = {
    id: crypto.randomUUID(),
    userId: verifiedUserId,
    examId,
    status: 'REGISTERED',
  };

  registrations.push(registration);
  exam.registeredCount += 1;

  return {
    status: 'SUCCESS',
    registration: structuredClone(registration),
    exam: structuredClone(exam),
  };
}

// má vracet { status, reason} nebo { status, exam}
// status = SUCCESS | REJECTED
export async function unpublishExamTerm(examId, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'TEACHER') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // existuje termín?
  const exam = exams.find((e) => e.id === examId);
  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }
  // doménová logika

  if (exam.status === 'CANCELED') {
    return {
      status: 'REJECTED',
      reason: 'Termín je již zrušen',
    };
  }

  if (exam.status === 'DRAFT') {
    return {
      status: 'REJECTED',
      reason: 'Termín je již stažen ze zveřejnění',
    };
  }

  // termín má aktivní rezervace?
  const hasRegistrations = registrations.some((r) => r.examId === examId && r.status === 'REGISTERED');

  if (hasRegistrations) {
    return {
      status: 'REJECTED',
      reason: 'Termín má přihlášené studenty a nelze jej stáhnout',
    };
  }

  // skutečné zrušení termínu
  exam.status = 'DRAFT';

  return { status: 'SUCCESS', exam: structuredClone(exam) };
}

// má vracet { status, reason} nebo { result, registration, exam }
// status = SUCCESS | REJECTED
export async function unregisterFromExam(examId, userId, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'STUDENT') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // doménová logika
  const verifiedUserId = user.userId;

  const exam = exams.find((e) => e.id === examId);

  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }

  // existuje registrace?
  const registration = registrations.find(
    (r) => r.userId === verifiedUserId && r.examId === examId && r.status === 'REGISTERED',
  );

  if (!registration) {
    return {
      status: 'REJECTED',
      reason: 'Registrace neexistuje',
    };
  }

  // odhlásit se je možné jen z publikovaného termínu
  if (exam.status !== 'PUBLISHED') {
    return {
      status: 'REJECTED',
      reason: 'Odregistrace je možná jen z publikovaného termínu',
    };
  }

  // zrušení registrace
  registration.status = 'CANCELED';
  exam.registeredCount -= 1;

  return {
    status: 'SUCCESS',
    registration: structuredClone(registration),
    exam: structuredClone(exam),
  };
}

// má vracet { status, reason} nebo { status, exam}
// status = SUCCESS | REJECTED
export async function updateExamCapacity(examId, capacity, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'TEACHER') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // doménová logika
  const exam = exams.find((e) => e.id === examId);

  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }

  if (!Number.isInteger(capacity) || capacity < 0) {
    return {
      status: 'REJECTED',
      reason: 'Neplatná kapacita',
    };
  }

  if (capacity < exam.registeredCount) {
    return {
      status: 'REJECTED',
      reason: 'Kapacita je menší než počet registrovaných studentů',
    };
  }

  if (exam.status === 'CANCELED') {
    return {
      status: 'REJECTED',
      reason: 'Nelze zmenit kapacitu zrušeného termínu',
    };
  }

  // zmena kapacity
  exam.capacity = capacity;
  return { status: 'SUCCESS', exam: structuredClone(exam) };
}

export async function updateExamTerm(examId, data, token) {
  await delay();

  // existuje token?
  if (!token) {
    return {
      status: 'REJECTED',
      reason: 'Uživatel není přihlášený',
    };
  }

  // existuje uživatel podle tokenu?
  const user = users.find((u) => u.token === token);
  if (!user) {
    return {
      status: 'REJECTED',
      reason: 'Neplatný token',
    };
  }

  // má uživatel oprávnění?
  if (user.role !== 'TEACHER') {
    return {
      status: 'REJECTED',
      reason: 'Uživatel nemá oprávnění',
    };
  }

  // doménová logika
  const exam = exams.find((e) => e.id === examId);

  if (!exam) {
    return {
      status: 'REJECTED',
      reason: 'Termín neexistuje',
    };
  }

  // změna zkouškového termínu
  if (exam.status === 'CANCELED') {
    return {
      status: 'REJECTED',
      reason: 'Nelze zmenit zrušeného termínu',
    };
  }

  // validace vstupních dat

  const { name, date, capacity } = data;

  // name
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return {
        status: 'REJECTED',
        reason: 'Neplatný název termínu',
      };
    }
  }

  // date
  if (date !== undefined) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return {
        status: 'REJECTED',
        reason: 'Neplatný datum termínu',
      };
    }
  }

  // capacity
  if (capacity !== undefined) {
    if (typeof capacity !== 'number' || capacity < 0) {
      return {
        status: 'REJECTED',
        reason: 'Neplatná kapacita termínu',
      };
    }
  }

  const registeredCount = registrations.filter((r) => r.examId === exam.id && r.status === 'REGISTERED').length;

  if (capacity < registeredCount) {
    return {
      status: 'REJECTED',
      reason: 'Kapacita je menší než počet registrovaných studentů',
    };
  }

  // zmena zkouškového termínu
  if (name !== undefined) {
    exam.name = name;
  }
  if (date !== undefined) {
    exam.date = date;
  }
  if (capacity !== undefined) {
    exam.capacity = capacity;
  }

  return { status: 'SUCCESS', exam: structuredClone(exam) };
}
