// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import { isBoolean } from "./is-boolean.validator.ts";
import { isNull } from "./is-null.validator.ts";
import { isNumber } from "./is-number.validator.ts";
import { isPlainObject } from "./is-plain-object.validator.ts";
import { isString } from "./is-string.util.ts";
import { isUndefined } from "./is-undefined.validator.ts";

export function IsPrimitive(value: unknown): boolean {
  return (
    isNull(value) ||
    isBoolean(value) ||
    isUndefined(value) ||
    isNumber(value) ||
    isString(value) ||
    isPlainObject(value)
  );
}
