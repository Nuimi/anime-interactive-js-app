import { delay } from "./utils.js";

export function createAuthApi(db) {
  return {
    async whoAmI(token) {
      await delay();

      if (!token) {
        return { status: "REJECTED", reason: "Uživatel není přihlášený" };
      }

      const user = db.users.find((u) => u.token === token);

      if (!user) {
        return { status: "REJECTED", reason: "Neplatný token" };
      }

      return { status: "SUCCESS", userId: user.userId, role: user.role };
    },
  };
}
