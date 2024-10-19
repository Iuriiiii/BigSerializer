// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import { isDate } from "./is-date.validator.ts";
import { isInfinity } from "./is-infinity.validator.ts";
import { isNull } from "./is-null.validator.ts";
import { isNumber } from "./is-number.validator.ts";
import { isPlainObject } from "./is-plain-object.validator.ts";
import { isSerializableObject } from "./is-serializable-object.validator.ts";
import { isString } from "./is-string.util.ts";
import { isUndefined } from "./is-undefined.validator.ts";

export function IsSerializable(value: unknown) {
  const filters = [
    isNumber,
    isString,
    isPlainObject,
    isSerializableObject,
    isUndefined,
    isNull,
    isDate,
    isNaN,
    isInfinity,
  ];

  // @ts-ignore: ignore `unknown` data type error.
  return filters.some((filter) => filter(value));
}
