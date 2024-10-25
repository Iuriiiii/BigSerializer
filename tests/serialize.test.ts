import {
  assert,
  assertEquals,
  assertExists,
  assertInstanceOf,
} from "@std/assert";
import { serializeValue } from "../mod.ts";
import {
  SERIALIZED_VALUE_DATATYPE_MEMBER,
  SERIALIZED_VALUE_INSTANCE_ID_MEMBER,
  SERIALIZED_VALUE_METADATA_MEMBER,
  SERIALIZED_VALUE_VALUE_MEMBER,
} from "../src/constants/mod.ts";

Deno.test("Primitives Serialization", async (t) => {
  await t.step("String value", () => {
    const serializableValue = "Hola cómo estás";
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, serializableValue);
  });

  await t.step("null === null", () => {
    const serializableValue = null;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, serializableValue);
  });

  await t.step("NaN === null", () => {
    const serializableValue = NaN;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, null);
  });

  await t.step("Infinity === null", () => {
    const serializableValue = Infinity;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, null);
  });

  await t.step("-Infinity === null", () => {
    const serializableValue = -Infinity;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, null);
  });

  await t.step("1 === 1", () => {
    const serializableValue = 1;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, serializableValue);
  });

  await t.step("1.1 === 1.1", () => {
    const serializableValue = 1.1;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, serializableValue);
  });

  await t.step(`"1.1" === "1.1"`, () => {
    const serializableValue = "1.1";
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, serializableValue);
  });

  await t.step(`false === false`, () => {
    const serializableValue = false;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, serializableValue);
  });

  await t.step(`true === true`, () => {
    const serializableValue = true;
    const serializedValue = serializeValue(serializableValue);

    assertEquals(serializedValue, serializableValue);
  });

  await t.step(`undefined === undefined`, () => {
    const serializableValue = undefined;
    const serializedValue = serializeValue(serializableValue);

    assert(
      serializedValue === undefined,
      `Expected: serializedValue === undefined, got: serializedValue === ${serializedValue}`,
    );
  });

  await t.step("{} === {}", () => {
    const serializableValue = {};
    const serializedValue = serializeValue(serializableValue);

    // @ts-ignore: Assert exists
    assertExists(serializedValue[SERIALIZED_VALUE_DATATYPE_MEMBER]);
    // @ts-ignore: Assert exists
    assertExists(serializedValue[SERIALIZED_VALUE_INSTANCE_ID_MEMBER]);
    // @ts-ignore: Assert exists
    assertExists(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]);
  });
});

Deno.test("Object Serialization", async (t) => {
  await t.step("Object with a field with value 1", () => {
    const serializableValue = { equisDe: 1 };
    const serializedValue = serializeValue(serializableValue);

    assertInstanceOf(serializedValue, Object);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_DATATYPE_MEMBER]);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_INSTANCE_ID_MEMBER]);
    assert(
      // @ts-ignore: Check members
      typeof serializedValue[SERIALIZED_VALUE_INSTANCE_ID_MEMBER] === "string",
    );
    // @ts-ignore: Check members
    assert(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER] instanceof Object);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER].equisDe);
    // @ts-ignore: Check members
    assert(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER].equisDe === 1);
  });

  await t.step("Object with referencing another object", () => {
    const a = { value: 1 };
    const serializableValue = { refA: a };
    const serializedValue = serializeValue(serializableValue);

    assertInstanceOf(serializedValue, Object);

    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_DATATYPE_MEMBER]);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_INSTANCE_ID_MEMBER]);
    assert(
      // @ts-ignore: Check members
      typeof serializedValue[SERIALIZED_VALUE_INSTANCE_ID_MEMBER] === "string",
    );
    // @ts-ignore: Check members
    assert(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER] instanceof Object);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER].refA);
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_DATATYPE_MEMBER],
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_VALUE_MEMBER],
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_INSTANCE_ID_MEMBER],
    );
    assert(
      // @ts-ignore: Check members
      typeof serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_INSTANCE_ID_MEMBER] === "string",
    );
    assert(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_VALUE_MEMBER] instanceof Object,
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_VALUE_MEMBER][SERIALIZED_VALUE_VALUE_MEMBER] ===
        1,
    );
  });

  await t.step("Object with referencing another object", () => {
    const a = { value: 1 };
    const serializableValue = { refA: a, a };
    const serializedValue = serializeValue(serializableValue);

    assertInstanceOf(serializedValue, Object);

    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_DATATYPE_MEMBER]);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_INSTANCE_ID_MEMBER]);
    assert(
      // @ts-ignore: Check members
      typeof serializedValue[SERIALIZED_VALUE_INSTANCE_ID_MEMBER] === "string",
    );
    // @ts-ignore: Check members
    assert(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER] instanceof Object);
    // @ts-ignore: Check members
    assertExists(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER].refA);
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_DATATYPE_MEMBER],
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_VALUE_MEMBER],
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_INSTANCE_ID_MEMBER],
    );
    assert(
      // @ts-ignore: Check members
      typeof serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_INSTANCE_ID_MEMBER] === "string",
    );
    assert(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_VALUE_MEMBER] instanceof Object,
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .refA[SERIALIZED_VALUE_VALUE_MEMBER][SERIALIZED_VALUE_VALUE_MEMBER] ===
        1,
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .a[SERIALIZED_VALUE_DATATYPE_MEMBER],
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .a[SERIALIZED_VALUE_VALUE_MEMBER],
    );
    assert(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .a[SERIALIZED_VALUE_DATATYPE_MEMBER] === "instance",
    );
    assertExists(
      // @ts-ignore: Check members
      serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .a[SERIALIZED_VALUE_VALUE_MEMBER],
    );
    assert(
      // @ts-ignore: Check members
      typeof serializedValue[SERIALIZED_VALUE_VALUE_MEMBER]
        .a[SERIALIZED_VALUE_VALUE_MEMBER] === "string",
    );
  });

  await t.step("Array elements are serialized", () => {
    const serializableValue = [1, new Date(), "hello"];
    const serializedValue = serializeValue(serializableValue);

    assertInstanceOf(serializedValue, Array);
    assert(serializedValue.length === 3);
    assert(serializedValue[0] === 1);
    // @ts-ignore: Check members
    assert(serializedValue[1][SERIALIZED_VALUE_DATATYPE_MEMBER] === "class");
    // @ts-ignore: Check members
    assert(serializedValue[1][SERIALIZED_VALUE_METADATA_MEMBER] === "Date");
    assert(serializedValue[2] === "hello");
  });

  await t.step("Array elements has empty elements", () => {
    const serializableValue = [1, , , new Date(), "hello", , 3];
    const serializedValue = serializeValue(serializableValue);

    assertInstanceOf(serializedValue, Array);
    assert(serializedValue.length === 7);
    assert(serializedValue[0] === 1);
    assert(serializedValue[4] === "hello");
    // @ts-ignore: Check members
    assert(serializedValue[3][SERIALIZED_VALUE_DATATYPE_MEMBER] === "class");
    // @ts-ignore: Check members
    assert(serializedValue[3][SERIALIZED_VALUE_METADATA_MEMBER] === "Date");
    assert(serializedValue[6] === 3);

    // @ts-ignore: Check members
    assert(serializedValue[1][SERIALIZED_VALUE_DATATYPE_MEMBER] === "empty");
    // @ts-ignore: Check members
    assert(serializedValue[2][SERIALIZED_VALUE_DATATYPE_MEMBER] === "empty");
    // @ts-ignore: Check members
    assert(serializedValue[5][SERIALIZED_VALUE_DATATYPE_MEMBER] === "empty");
  });
});
