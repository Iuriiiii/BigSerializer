// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import {
  SERIALIZED_VALUE_DATATYPE_MEMBER,
  SERIALIZED_VALUE_EMPTY,
  SERIALIZED_VALUE_INSTANCE_ID_MEMBER,
  SERIALIZED_VALUE_METADATA_MEMBER,
  SERIALIZED_VALUE_VALUE_MEMBER,
} from "../constants/mod.ts";
import { serializables } from "../singletons/mod.ts";
import type { Constructor, NativeMetadata } from "../types/mod.ts";
import { isArray, isBinaryValue } from "../validators/mod.ts";
import { deserializeClassArgument } from "./deserialize-class-argument.util.ts";

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
      case "empty": {
        if (value[SERIALIZED_VALUE_VALUE_MEMBER] === null) {
          return SERIALIZED_VALUE_EMPTY;
        }

        return value;
      }
      case "class": {
        const { clazz, args } = deserializeClassArgument(
          serializedValue,
          className as NativeMetadata,
          instances,
        );
        const Serializable: Constructor = clazz ?? serializables.get(className);
        // console.log("src/utils/deserialize-value.util.ts:55->function", {
        //   args,
        //   Serializable
        // });
        const instance = new Serializable(...args);

        // console.log('src/utils/deserialize-value.util.ts:61->function', instance);

        instances.set(instanceId, instance);

        if (clazz) {
          return instance;
        }

        // @ts-ignore: Access to deserialize().
        return instance.deserialize(serializedValue, instances);
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
  } else if (isArray(value)) {
    const res: unknown[] = [];
    for (let i = 0; i < value.length; i++) {
      // @ts-ignore: Set instances
      const deserialized = deserializeValue(value[i], instances);

      if (deserialized === SERIALIZED_VALUE_EMPTY) {
        continue;
      }

      res[i] = deserialized;
    }

    return res;
  }

  return value;
}
