// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import {
  SERIALIZED_VALUE_DATATYPE_MEMBER,
  SERIALIZED_VALUE_INSTANCE_ID_MEMBER,
  SERIALIZED_VALUE_METADATA_MEMBER,
  SERIALIZED_VALUE_VALUE_MEMBER,
} from "../constants/mod.ts";
import { SerializedValue } from "../interfaces/mod.ts";
import { serializables } from "../singletons/mod.ts";
import {
  isArray,
  isClassInstance,
  isDate,
  isInfinity,
  isNaN,
  isPlainObject,
  IsPrimitive,
} from "../validators/mod.ts";
import { randomString } from "./random-string.util.ts";

function resolveInstance(value: unknown, instances: Map<unknown, string>) {
  return {
    [SERIALIZED_VALUE_DATATYPE_MEMBER]: "instance",
    [SERIALIZED_VALUE_VALUE_MEMBER]: instances.get(value),
  } satisfies SerializedValue;
}

function serializePrimitive(value: unknown, instances: Map<unknown, string>) {
  if (!isPlainObject(value)) {
    if (isNaN(value) || isInfinity(value)) {
      return null;
    }

    return value;
  }

  if (instances.has(value)) {
    return resolveInstance(value, instances);
  }

  const result = {};
  const referenceId = randomString();
  instances.set(value, referenceId);

  for (const key in value) {
    // @ts-ignore: Able array access.
    const objectValue = value[key] as unknown;

    // @ts-ignore: Able array access.
    result[key] = serializeValue(objectValue, instances);
  }

  return {
    [SERIALIZED_VALUE_DATATYPE_MEMBER]: "object",
    [SERIALIZED_VALUE_VALUE_MEMBER]: result,
    [SERIALIZED_VALUE_INSTANCE_ID_MEMBER]: referenceId,
  } satisfies SerializedValue;
}

/**
 * Serializes a value to an string.
 * @param {unknown} value The value to serialize
 * @returns {unknown} The serialized object to be used with `deserializeValue`
 */
export function serializeValue(value: unknown): unknown;
export function serializeValue(value: unknown, instances = new Map()): unknown {
  if (IsPrimitive(value)) {
    return serializePrimitive(value, instances);
  } else if (isArray(value)) {
    // @ts-ignore: Access to instances param
    return value.map((item: unknown) => serializeValue(item, instances));
  } else if (isDate(value)) {
    if (instances.has(value)) {
      return resolveInstance(value, instances);
    }

    const instanceId = randomString();
    instances.set(value, instanceId);

    return {
      [SERIALIZED_VALUE_DATATYPE_MEMBER]: "date",
      [SERIALIZED_VALUE_METADATA_MEMBER]: "Date",
      [SERIALIZED_VALUE_INSTANCE_ID_MEMBER]: instanceId,
      [SERIALIZED_VALUE_VALUE_MEMBER]: value.toISOString(),
    } satisfies SerializedValue;
  } else if (isClassInstance(value)) {
    if (!serializables.has(value.constructor)) {
      throw new Error("Non serializable data type detected.");
    }
    const instanceId = randomString();
    instances.set(value, instanceId);

    return {
      [SERIALIZED_VALUE_DATATYPE_MEMBER]: "class",
      // @ts-ignore: Serialize method.
      [SERIALIZED_VALUE_VALUE_MEMBER]: value.serialize(instances),
      // @ts-ignore: Get original class name.
      [SERIALIZED_VALUE_METADATA_MEMBER]: value.originalName,
      [SERIALIZED_VALUE_INSTANCE_ID_MEMBER]: instanceId,
    } satisfies SerializedValue;
  }

  throw new Error("Non serializable data type detected.");
}
