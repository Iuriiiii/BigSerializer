// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import {
  SERIALIZED_VALUE_DATATYPE_MEMBER,
  SERIALIZED_VALUE_INSTANCE_ID_MEMBER,
  SERIALIZED_VALUE_METADATA_MEMBER,
  SERIALIZED_VALUE_VALUE_MEMBER,
} from "../constants/mod.ts";
import { serializables } from "../singletons/mod.ts";
import { isBinaryValue } from "../validators/mod.ts";

/**
 * Deserializes a previous serialized value.
 * @param {unknown} value The serialized value to deserialize
 * @returns The deserialized value or the same first argument if
 * this argument is not a serialized value
 *
 * @example
 * const creationDate = new Date();
 * const serializedValue = serializeValue({
 *  name: "jorge",
 *  age: 25,
 *  creationDate,
 * });
 *
 * const deserializedValue = deserializeValue(serializedValue);
 * // deserializedValue = { name: "jorge", age: 25, creationDate };
 */
export function deserializeValue<T = unknown>(value: unknown): T;
export function deserializeValue(value: unknown, instances = new Map()) {
  if (isBinaryValue(value)) {
    const instanceId = value[SERIALIZED_VALUE_INSTANCE_ID_MEMBER];
    const className = value[SERIALIZED_VALUE_METADATA_MEMBER];
    const serializedValue = value[SERIALIZED_VALUE_VALUE_MEMBER];

    switch (value[SERIALIZED_VALUE_DATATYPE_MEMBER]) {
      case "class": {
        const Serializable = serializables.get(className);
        const instance = new Serializable();

        instances.set(instanceId, instance);

        // @ts-ignore: Access to deserialize().
        return instance.deserialize(serializedValue, instances);
      }
      case "date": {
        const date = new Date(serializedValue as string);
        instances.set(instanceId, date);

        return date;
      }
      case "instance": {
        return instances.get(serializedValue);
      }

      case "object": {
        const result = {};

        for (const key in serializedValue as object) {
          // @ts-ignore: Item access
          const objectValue = serializedValue[key] as unknown;
          // @ts-ignore: Item access
          result[key] = deserializeValue(objectValue, instances);
        }
        instances.set(instanceId, result);

        return result;
      }
    }
  }

  return value;
}
