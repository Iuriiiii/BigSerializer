// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import {
  SERIALIZED_VALUE_DATATYPE_MEMBER,
  SERIALIZED_VALUE_EMPTY,
  SERIALIZED_VALUE_INSTANCE_ID_MEMBER,
  SERIALIZED_VALUE_METADATA_MEMBER,
  SERIALIZED_VALUE_VALUE_MEMBER,
} from "../constants/mod.ts";
import type { SerializedValue } from "../interfaces/mod.ts";
import { serializables } from "../singletons/mod.ts";
import {
  isArray,
  isClassInstance,
  isDate,
  isInfinity,
  isNaN,
  isPlainObject,
  IsPrimitive,
  isRegex,
  isSerializableNativeClass,
} from "../validators/mod.ts";
import { randomString } from "./random-string.util.ts";
import { serializeClassArgument } from "./serialize-class-argument.util.ts";
import { serializeMetadata } from "./serialize-metadata.util.ts";

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
    result[key] = serializeValue(value[key] as unknown, instances);
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
    const res: unknown[] = [];
    for (let i = 0; i < value.length; i++) {
      if (!(i in value)) {
        // @ts-ignore: use instances
        res[i] = SERIALIZED_VALUE_EMPTY;
      } else {
        // @ts-ignore: use instances
        res[i] = serializeValue(value[i], instances);
      }
    }

    return res;
  }

  const _isSerializableNativeClass = isSerializableNativeClass(value);
  const _isDate = isDate(value);
  const _isRegex = isRegex(value);

  if (isClassInstance(value)) {
    if (
      !serializables.has(value.constructor) &&
      !_isSerializableNativeClass &&
      !_isDate &&
      !_isRegex
    ) {
      throw new Error("Non serializable data type detected.");
    }

    const instanceId = randomString();
    instances.set(value, instanceId);

    return {
      [SERIALIZED_VALUE_DATATYPE_MEMBER]: "class",
      [SERIALIZED_VALUE_VALUE_MEMBER]: serializeClassArgument(value, instances),
      [SERIALIZED_VALUE_METADATA_MEMBER]: serializeMetadata(value),
      [SERIALIZED_VALUE_INSTANCE_ID_MEMBER]: instanceId,
    } satisfies SerializedValue;
  }

  throw new Error("Non serializable data type detected.");
}
