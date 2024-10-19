import { assert } from "@std/assert";
import { isNumber } from "../src/validators/mod.ts";

// Deno.test("isNumber", async (t) => {
//     await t.step("Check normal number", () => {
//         assert(isNumber(1));
//     });

//     await t.step("Check float number", () => {
//         assert(isNumber(1.333));
//     });

//     await t.step("Check NaN number", () => {
//         assert(isNumber(NaN));
//     });

//     await t.step("Check Infinity number", () => {
//         assert(isNumber(Infinity));
//     });

//     await t.step("Check -Infinity number", () => {
//         assert(isNumber(-Infinity));
//     });

//     await t.step("Check string is not a number", () => {
//         assert(!isNumber("-Infinity"));
//     });
// });
