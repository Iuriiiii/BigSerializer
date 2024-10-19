import { assert, assertInstanceOf, assertObjectMatch } from "@std/assert";
import { deserializeValue, Serializable, serializeValue } from "../mod.ts";
import { SERIALIZED_VALUE_VALUE_MEMBER } from "../src/constants/mod.ts";

@Serializable()
class Person {
    name: string = "John Doe";
    age: number = 30;
    email: string = "rZQp3@example.com";
    hobbies: string[] = ["reading", "music"];
    createdAt: Date = new Date();
    hasJob: boolean = true;
    isMarried: boolean = false;

    toPlain() {
        return {
            name: this.name,
            age: this.age,
            email: this.email,
            hobbies: this.hobbies,
            hasJob: this.hasJob,
            isMarried: this.isMarried,
        };
    }
}

@Serializable()
class Entity {
    public readonly creationDate = new Date();
    constructor(public readonly type: string, public readonly name: string) {}

    toPlain() {
        return {
            type: this.type,
            name: this.name,
        };
    }
}

Deno.test("Serializable Class Serialization", async (t) => {
    await t.step(`Class Person serialization`, () => {
        const serializableValue = new Person();
        const serializedValue = serializeValue(serializableValue);
        assertInstanceOf(serializedValue, Object);
        //@ts-ignore: Check members
        assertObjectMatch(serializedValue[SERIALIZED_VALUE_VALUE_MEMBER], {
            name: "John Doe",
            age: 30,
            email: "rZQp3@example.com",
            hobbies: ["reading", "music"],
            hasJob: true,
            isMarried: false,
        });
    });

    await t.step(`Class Entity serialization`, () => {
        const serializableValue = new Entity("human", "Mateo");
        const serializedValue = serializeValue(serializableValue);
        assertInstanceOf(serializedValue, Object);
        assertObjectMatch(
            //@ts-ignore: Check members
            serializedValue[SERIALIZED_VALUE_VALUE_MEMBER],
            serializableValue.toPlain(),
        );
    });
});

Deno.test("Serializable Class Deserialization", async (t) => {
    await t.step(`Class Person deserialize`, () => {
        const serializableValue = new Person();
        const serializedValue = serializeValue(serializableValue);
        const deserializedValue = deserializeValue<Person>(serializedValue);
        assert(serializableValue !== deserializedValue);
        assertInstanceOf(deserializedValue, Person);
        assertObjectMatch(
            deserializedValue,
            serializableValue.toPlain(),
        );
    });

    await t.step(`Class Entity deserialize`, () => {
        const serializableValue = new Entity("human", "Mateo");
        const serializedValue = serializeValue(serializableValue);
        const deserializedValue = deserializeValue<Entity>(serializedValue);
        assert(serializableValue !== deserializedValue);
        assert(
            serializableValue.creationDate.toISOString() ===
                deserializedValue.creationDate.toISOString(),
        );
        assertInstanceOf(deserializedValue, Entity);
        assertObjectMatch(
            deserializedValue,
            serializableValue.toPlain(),
        );
    });
});
