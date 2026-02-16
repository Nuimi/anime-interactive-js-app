
import { getAnimeData } from "./database/animeList.js";
import { getAnimeScreeningData } from "./database/screeningRegistrations.js";

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

// ==================
// Mock * databáze *
// ==================

let exams = getAnimeData();
let animeList = getAnimeData();

let registrations = getAnimeScreeningData();

// =================
// helpers
// =================
function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =========================
// API
// =========================

/**
 * Fetch all exams
 *
 * @returns {Promise<Array<exam>>}
 */
export async function fetchAnimeListData()
{
  await delay();
  return {
    exams: structuredClone(animeList),
    registrations: structuredClone(registrations),
  };
}

/**
 * Enroll current student to an exam
 *
 * @param {string} animeId
 * @returns {Promise<registration>}
 */
export async function cancelExamTerm(animeId) {
  await delay();

  const exam = exams.find((t) => t.id === animeId);

  if (!exam) {
    throw new Error('BE: Exam term not found');
  }

  // je někdo zapsaný na termín?
  const hasRegistrations = registrations.some((e) => e.animeId === animeId && e.status === 'REGISTERED');

  if (hasRegistrations) {
    throw new Error('BE: Exam term cannot be canceled - has registrations');
  }

  exams.filter((e) => e.id !== exam.id);

  return { exams: structuredClone(exams) };
}

export async function registerForExam(animeId, userId) {
  await delay();

  const exam = exams.find((t) => t.id === animeId);

  if (!exam) {
    throw new Error('BE: Exam term not found');
  }

  // invariant: capacity
  if (exam.registeredCount >= exam.capacity) {
    throw new Error('BE: Exam term is full');
  }

  // invariant: student cannot be REGISTERED twice
  const existingRegistration = registrations.find(
    (e) => e.animeId === animeId && e.userId === userId && e.status === 'REGISTERED',
  );

  if (existingRegistration) {
    throw new Error('BE: Student is already registered for this exam');
  }

  // serverová změna stavu
  exam.registeredCount += 1;

  const registration = {
    id: crypto.randomUUID(),
    userId,
    animeId,
    status: 'REGISTERED',
    createdAt: new Date().toISOString(),
  };

  registrations.push(registration);

  return {
    exam: structuredClone(exam),
    registration: structuredClone(registration),
  };
}

export async function unregisterFromExam(animeId, userId) {
  await delay();

  const exam = exams.find((t) => t.id === animeId);

  if (!exam) {
    throw new Error('BE: Exam term not found');
  }

  // existuje zápis se stavem REGISTERED?
  const registration = registrations.find(
    (e) => e.animeId === animeId && e.userId === userId && e.status === 'REGISTERED',
  );

  if (!registration) {
    throw new Error('BE: Student cannot be unregistered - is not registered for the term');
  }

  // serverová změna statusu
  registration.status = 'CANCELED';

  // serverová změna registeredCount
  exam.registeredCount -= 1;

  return {
    exam: structuredClone(exam),
    registration: structuredClone(registration),
  };
}

export async function updateExamCapacity(animeId, capacity) {
  await delay();

  const exam = exams.find((t) => t.id === animeId);

  if (!exam) {
    throw new Error('BE: Exam term not found');
  }

  // invariant: kapacita nemůže být míň než počet přihlášených studentů REGISTERED
  if (exam.registeredCount > capacity) {
    throw new Error('BE: New capacity cannot be less than the number of registered students');
  }
  exam.capacity = capacity;

  return { exam: structuredClone(exam) };
}
