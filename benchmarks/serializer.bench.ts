// deno-lint-ignore-file no-explicit-any no-unused-vars
import { serializeValue } from "../mod.ts";
import { serialize } from "jsr:@workers/v8-value-serializer";
import * as V8 from "node:v8";

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = characters.slice(0, -10)[randomInt(0, 52)];
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomValue(primitive = true): any {
  const types = ["string", "wtf-16", "integer", "number", "boolean", "null"];
  if (!primitive) types.push("array");
  const type = types[Math.floor(Math.random() * types.length)];

  switch (type) {
    case "string":
      return generateRandomString(randomInt(0, 100));
    case "wtf-16":
      return String.fromCharCode.apply(
        undefined,
        crypto.getRandomValues(new Uint16Array(randomInt(0, 1000))) as any,
      );
    case "integer":
      return randomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    case "number":
      return Math.random() * Number.MAX_VALUE;
    case "boolean":
      return Math.random() < 0.5;
    case "array":
      return Array.from(
        { length: randomInt(0, 10) },
        () => generateRandomValue(false),
      );
    case "undefined":
      return undefined;
    case "null":
    default:
      return null;
  }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomObject(breadth: number, depth: number) {
  if (depth === 0) {
    return generateRandomValue();
  }

  const obj: any = {};
  for (let i = 0, len = randomInt(1, breadth); i < len; i++) {
    const key = generateRandomString(randomInt(1, 16)); // Generate random key
    obj[key] = generateRandomValue();
  }
  for (let i = 0, len = randomInt(1, breadth); i < len; i++) {
    const key = generateRandomString(randomInt(1, 16)); // Generate random key
    obj[key] = generateRandomObject(breadth, depth - 1);
  }

  return obj;
}

function _countProperties(obj: any) {
  let count = 0;

  function countNestedProperties(obj: any) {
    if (Array.isArray(obj)) {
      count += obj.length;
      for (let i = 0; i < obj.length; i++) {
        countNestedProperties(obj[i]);
      }
    } else if (obj !== null && typeof obj === "object") {
      for (const key in obj) {
        if (Object.hasOwn(obj, key)) {
          count++;
          countNestedProperties(obj[key]);
        }
      }
    }
  }

  countNestedProperties(obj);
  return count;
}

const typicalObject = generateRandomObject(5, 5);
// console.log(typicalObject);

const OBJECT_TO_SERIALIZE = {
  a: {
    b: {
      c: {
        d: {
          e: {
            f: {
              g: {
                h: {
                  i: {
                    j: {
                      k: {
                        l: {
                          m: {
                            n: {
                              o: {
                                p: {
                                  q: {
                                    r: {
                                      s: {
                                        t: 1,
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit vel tortor id mollis. Maecenas maximus ac arcu non fermentum. Pellentesque consectetur tincidunt dui, nec laoreet ligula egestas eu. Donec sagittis, diam quis tincidunt interdum, neque tortor varius sapien, eu rutrum nulla est a lacus. Duis luctus consequat lobortis. Nam sit amet ex in lectus laoreet pharetra et eget enim. Morbi vel ultricies lacus, at blandit diam. In hac habitasse platea dictumst. Aenean pretium, ipsum sed pharetra facilisis, nibh magna egestas nunc, eu suscipit arcu massa eget dolor. Vivamus finibus semper maximus.",
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
};

function generateBenchs(object: any, name: string) {
  Deno.bench({
    name: "BigSerializer.serializeValue -> " + name,
    fn: () => {
      serializeValue(object);
    },
    group: name,
    baseline: true,
  });

  Deno.bench({
    name: "v8-value-serializer.serialize -> " + name,
    fn: () => {
      serialize(object);
    },
    group: name,
  });

  // Deno.bench({
  //   name: "serdes.serialize -> " + name,
  //   fn: () => {
  //     serdes.serialize(object);
  //   },
  //   group: name,
  // });

  Deno.bench({
    name: "node.V8.serialize -> " + name,
    fn: () => {
      V8.serialize(object);
    },
    group: name,
  });

  Deno.bench({
    name: "JSON.stringify -> " + name,
    fn: () => {
      JSON.stringify(object);
    },
    group: name,
  });
}

// generateBenchs(typicalObject, "typicalObject");
// generateBenchs(OBJECT_TO_SERIALIZE, "OBJECT_TO_SERIALIZE");

const typicalString = JSON.stringify(typicalObject);
const randomNumber = Math.random() * Number.MAX_SAFE_INTEGER;
const justNull = null;
const longArrayOfRandomNumbers = Array.from(
  { length: 1000 },
  (_, i) => Math.random() * Number.MAX_SAFE_INTEGER,
);
const longArrayOfConsecutiveNumbers = Array.from(
  { length: 1000 },
  (_, i) => i,
);
const longArrayOfTypicalStrings = Array.from(
  { length: 100 },
  (_, i) => typicalString,
);

// generateBenchs(typicalString, "typicalString");
// generateBenchs(randomNumber, "randomNumber");
// generateBenchs(justNull, "justNull");
generateBenchs(longArrayOfRandomNumbers, "longArrayOfRandomNumbers");
generateBenchs(longArrayOfConsecutiveNumbers, "longArrayOfConsecutiveNumbers");
generateBenchs(longArrayOfTypicalStrings, "longArrayOfTypicalStrings");
