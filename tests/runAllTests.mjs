import { testAllowedTransition } from "./test/testAllowedTransition.js";
import { testInvariant } from "./test/testInvariant.js";
import { testForbiddenTransition } from "./test/testForbiddenTransition.js";
import {testInitialState} from "./test/stateTests.js";

export async function runAllTests() {
  console.log("--- Spouštím testy ---");

  testInitialState();
  await testAllowedTransition();
  await testForbiddenTransition();
  await testInvariant();

  console.log("--- Testy dokončeny ---");
}

runAllTests();
