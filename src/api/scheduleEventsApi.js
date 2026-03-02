import { delay } from './utils.js';
export function createScheduleEventsApi(db) {
  return {
    // přechodové funkce mezi stavy pro ScheduleEvent
    // **********************************************

    // 1. Přechod DRAFT -> OPEN
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Realizuje přechod: DRAFT → OPEN
     *
     * Přijímá:
     * - eventId: string
     * - token: string
     *
     * Přechod povolen, pokud:
     * - existuje uživatel podle tokenu
     * - uživatel má roli TEACHER
     * - event existuje
     * - event.status === 'DRAFT'
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async openScheduleEvent(eventId, token) {
      await delay();
      // TODO business logika
    },

    // 2. Přechod OPEN/CLOSED → CANCELED
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Realizuje přechod: OPEN → CANCELED nebo CLOSED → CANCELED
     *
     * Přijímá:
     * - eventId: string
     * - token: string
     *
     * Přechod povolen, pokud:
     * - existuje uživatel podle tokenu
     * - uživatel má roli SCHEDULER
     * - event existuje
     * - event.status !== 'CANCELED'
     * - event neobsahuje ENROLLED
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async cancelScheduleEvent(eventId, token) {
      await delay();
      // TODO business logika
      // return { status: "SUCCESS", event: structuredClone(event)};
    },

    // 3. přechod OPEN → CLOSED (automaticky)
    // Tato funkce je model "systémového aktéra".
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Systémový přechod: OPEN → CLOSED (čas vypršel)
     *
     * Přijímá:
     * - eventId: string
     *
     * Přechod povolen, pokud:
     * - event existuje
     * - event.status === 'OPEN'
     * - now >= event.time
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async closeScheduleEventByTime(eventId) {
      await delay();
      // TODO business logika
    },

    // 4. update capacity
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Změní atribut capacity
     *
     * Přijímá:
     * - eventId: string
     * - capacity: number
     * - token: string
     *
     * Povolení:
     * - existuje uživatel podle tokenu
     * - uživatel má roli SCHEDULER
     * - event existuje
     * - capacity >= enrolledCount
     * - capacity <= maximalCapacity
     * - event.status !== 'CANCELED'
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async updateScheduleEventCapacity(eventId, capacity, token) {
      await delay();
      // TODO business logika
    },

    // 5. update maximalCapacity
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Změní atribut maximalCapacity
     *
     * Přijímá:
     * - eventId: string
     * - maximalCapacity: number
     * - token: string
     *
     * Povolení:
     * - existuje uživatel podle tokenu
     * - uživatel má roli TEACHER
     * - event existuje
     * - maximalCapacity >= capacity
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async updateScheduleEventMaximalCapacity(eventId, maximalCapacity, token) {
      await delay();
      // TODO business logika
    },

    // 6. přechod NONE/WAITING → WAITING/ENROLLED
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Realizuje přechody:
     *   NONE → ENROLLED
     *   NONE → WAITING
     *   WAITING → ENROLLED
     *
     * Přijímá:
     * - eventId: string
     * - token: string
     *
     * Přechod povolen, pokud:
     * - existuje uživatel podle tokenu
     * - uživatel má roli STUDENT
     * - event existuje
     * - event.status === 'OPEN'
     *
     * Efekt:
     * - pokud enrolledCount < capacity → ENROLLED
     * - jinak → WAITING
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent), structuredClone(enrollments) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async enroll(eventId, token) {
      await delay();
      // TODO business logika
    },

    // 7. přechod WAITING/ENROLLED → CANCELED
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Realizuje přechody:
     *   WAITING → CANCELED
     *   ENROLLED → CANCELED
     *
     * Přijímá:
     * - eventId: string
     * - token: string
     *
     * Přechod povolen, pokud:
     * - existuje uživatel podle tokenu
     * - uživatel má roli STUDENT
     * - event existuje
     * - event.status === 'OPEN'
     *
     * Efekt:
     * - pokud byl ENROLLED → enrolledCount--
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent), structuredClone(enrollment) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async cancelEnrollment(eventId, token) {
      await delay();
      // TODO business logika
    },

    // CRUD funkce **************************

    // 1. create
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Vytvoří nový ScheduleEvent ve stavu DRAFT
     *
     * Přijímá:
     * - payload: { name, time, maximalCapacity }
     * - token: string
     *
     * Povolení:
     * - existuje uživatel podle tokenu
     * - uživatel má roli SCHEDULER
     * - maximalCapacity > 0
     *
     * Efekt:
     * - vzniká nový event
     * - status = 'DRAFT'
     * - capacity = 0
     * - enrolledCount = 0
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */

    async createScheduleEvent(payload, token) {
      await delay();
      // TODO business logika
    },

    // 2. get
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Načte aktuální stav části systému (ScheduleEvents, Enrollments)
     *
     * Přijímá:
     * - token (string)
     *
     * Povolení:
     * - existuje uživatel podle tokenu
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvents), structuredClone(enrollments) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */
    async getScheduleEvents(token) {
      await delay();
      // TODO business logika
    },

    // 3. updateDetails
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Aktualizuje detaily eventu (name, time)
     *
     * Přijímá:
     * - eventId: string
     * - payload: { name?, time? }
     * - token: string
     *
     * Povolení:
     * - existuje uživatel podle tokenu
     * - uživatel má roli TEACHER
     * - event existuje
     * - event.status !== 'CANCELED'
     *
     * Vrací:
     * - { status: 'SUCCESS', structuredClone(scheduleEvent) }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */

    async updateScheduleEventDetails(eventId, payload, token) {
      await delay();
      // TODO business logika
    },

    // 4. delete
    /* KONTRAKT FUNKCE
     *
     * Účel:
     * - Fyzicky odstraní event (pokud to doména dovoluje)
     *
     * Přijímá:
     * - eventId: string
     * - token: string
     *
     * Povolení:
     * - existuje uživatel podle tokenu
     * - uživatel má roli SCHEDULER
     * - event existuje
     * - event.status !== 'CANCELED'
     * - neexistují ENROLLED
     *
     * Vrací:
     * - { status: 'SUCCESS', eventId }
     * - { status: 'REJECTED', reason }
     * - { status: 'ERROR' }
     */

    async deleteScheduleEvent(eventId, token) {
      await delay();
      // TODO business logika
    },
  };
}
