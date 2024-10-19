const NUMBER = 1;

Deno.bench("check number with typeof", () => {
  typeof NUMBER === "number";
});

Deno.bench("check number with constructor.name", () => {
  NUMBER.constructor.name === "Number";
});

// Needs an special flag, also sucks
Deno.bench("check number with __proto__", () => {
  // @ts-ignore: Check number
  NUMBER.__proto__ === Number.prototype;
});
