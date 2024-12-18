import {
  assert,
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertObjectMatch,
} from "@std/assert";
import { Serializable } from "../mod.ts";
import { deserializeValue, serializeValue } from "../mod.ts";

Deno.test("Primitive Data Types Deserialization", async (t) => {
  await t.step(`"Hola cómo estás" === "Hola cómo estás"`, () => {
    const serializableValue = "Hola cómo estás";
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, serializableValue);
  });

  await t.step(`1 === 1`, () => {
    const serializableValue = 1;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, serializableValue);
  });

  await t.step(`false === false`, () => {
    const serializableValue = false;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, serializableValue);
  });

  await t.step(`true === true`, () => {
    const serializableValue = true;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, serializableValue);
  });

  await t.step(`0 === 0`, () => {
    const serializableValue = 0;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, serializableValue);
  });

  await t.step(`1.32 === 1.32`, () => {
    const serializableValue = 1.32;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, serializableValue);
  });

  await t.step(`null === null`, () => {
    const serializableValue = null;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, serializableValue);
  });

  await t.step(`NaN === null`, () => {
    const serializableValue = NaN;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, null);
  });

  await t.step(`Infinity === null`, () => {
    const serializableValue = Infinity;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, null);
  });

  await t.step(`-Infinity === null`, () => {
    const serializableValue = -Infinity;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertEquals(deserializedValue, null);
  });

  await t.step(`Date === Date`, () => {
    const serializableValue = new Date();
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Date);
    assertEquals(
      (deserializedValue as Date).toISOString(),
      serializableValue.toISOString(),
    );
  });

  await t.step(`undefined === undefined`, () => {
    const serializableValue = undefined;
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assert(deserializedValue === undefined);
  });
});

Deno.test("Object Deserialization", async (t) => {
  await t.step(`{} === {}`, () => {
    const serializableValue = {};
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Object);
    assertObjectMatch(deserializedValue, serializableValue);
  });

  await t.step(`{a: 1} === {a: 1}`, () => {
    const serializableValue = { a: 1 };
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Object);
    assertObjectMatch(deserializedValue, serializableValue);
  });

  await t.step(`{a: 1, b: "hola"} === {a: 1, b: "hola"}`, () => {
    const serializableValue = { a: 1, b: "hola" };
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Object);
    assertObjectMatch(deserializedValue, serializableValue);
  });

  await t.step(`{a: 1, b: {}} === {a: 1, b: {}}`, () => {
    const serializableValue = { a: 1, b: {} };
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Object);
    assertObjectMatch(deserializedValue, serializableValue);
  });

  await t.step(`{a: 1, b: {a: 1}} === {a: 1, b: {a: 1}}`, () => {
    const serializableValue = { a: 1, b: { a: 1 } };
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Object);
    assertObjectMatch(deserializedValue, serializableValue);
  });

  await t.step(`{a: new Date()} === {a: new Date()}`, () => {
    const serializableValue = { a: new Date() };
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Object);
    assertObjectMatch(deserializedValue, serializableValue);
  });

  await t.step(
    `{a: new Date(), b: {c: new Date()}} === {a: new Date(), b: {c: new Date()}}`,
    () => {
      const serializableValue = { a: new Date(), b: { c: new Date() } };
      const serializedValue = serializeValue(serializableValue);
      const deserializedValue = deserializeValue(serializedValue);

      assertInstanceOf(deserializedValue, Object);
      assertObjectMatch(deserializedValue, serializableValue);
    },
  );

  await t.step(
    `{a: new Date(), b: {c: new Date(), d: Infinity, e: NaN, f: false, g: {}}} === {a: new Date(), b: {c: new Date(), d: null, e: null, f: false, g: {}}}`,
    () => {
      const serializableValue = {
        a: new Date(),
        b: { c: new Date(), d: null, e: null, f: false, g: {} },
      };
      const serializedValue = serializeValue(serializableValue);
      const deserializedValue = deserializeValue(serializedValue);

      assertInstanceOf(deserializedValue, Object);
      assertObjectMatch(deserializedValue, serializableValue);
    },
  );

  await t.step(
    `Recursive object`,
    () => {
      const a = { item: {} };
      const b = { a };
      const serializableValue = { b, a, c: a.item };
      const serializedValue = serializeValue(serializableValue);
      const deserializedValue = deserializeValue(serializedValue);

      assertInstanceOf(deserializedValue, Object);
      assertObjectMatch(deserializedValue, serializableValue);
    },
  );

  await t.step(
    `Recursive object`,
    () => {
      const a = { item: {} };
      const b = { a };
      const serializableValue = { b, a, c: a.item };
      const serializedValue = serializeValue(serializableValue);
      const deserializedValue = deserializeValue(serializedValue);

      assertInstanceOf(deserializedValue, Object);
      assertObjectMatch(deserializedValue, serializableValue);
    },
  );
});

@Serializable()
class TestClass {
  a = 1;
  date = new Date();

  public debug() {
    return this.a + 1;
  }
}

Deno.test("Class Deserialization", async (t) => {
  await t.step(`TestClass === TestClass`, () => {
    const serializableValue = new TestClass();
    console.log("tests/deserialize.test.ts:238->function", serializableValue);
    const serializedValue = serializeValue(serializableValue);
    console.log("tests/deserialize.test.ts:238->function", serializedValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, TestClass);
    assertExists(deserializedValue.a);
    assertExists(deserializedValue.date);
    assertEquals(deserializedValue.a, 1);
    assertExists(deserializedValue.debug);
    assertEquals(deserializedValue.debug(), 2);
  });

  await t.step(`TestClass.date === TestClass.date`, () => {
    const serializableValue = new TestClass();
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, TestClass);
    assertExists(deserializedValue.date);
    assertEquals(
      deserializedValue.date.toISOString(),
      serializableValue.date.toISOString(),
    );
  });

  await t.step("Array elements are serialized", () => {
    const serializableValue = [1, new Date(), "hello"];
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Array);
    assert(deserializedValue.length === 3);
    assert(deserializedValue[0] === 1);
    assertInstanceOf(deserializedValue[1], Date);
    assert(
      (deserializedValue[1] as Date).toISOString() ===
        (serializableValue[1] as Date).toISOString(),
    );
    assert(deserializedValue[2] === "hello");
  });

  await t.step("Array elements has empty elements", () => {
    const serializableValue = [1, , , new Date(), "hello", , 3];
    const serializedValue = serializeValue(serializableValue);
    const deserializedValue = deserializeValue(serializedValue);

    assertInstanceOf(deserializedValue, Array);
    assert(deserializedValue.length === 7);
    assert(deserializedValue[0] === 1);
    assert(deserializedValue[4] === "hello");
    assertInstanceOf(deserializedValue[3], Date);
    assert(
      (deserializedValue[3] as Date).toISOString() ===
        (serializableValue[3] as Date).toISOString(),
    );
    assert(deserializedValue[6] === 3);
    assert(!(1 in deserializedValue));
    assert(!(2 in deserializedValue));
    assert(!(5 in deserializedValue));
  });
});
