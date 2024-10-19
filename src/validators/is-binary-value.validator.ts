// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import { isObject } from "./is-object.validator.ts";
import { SerializedValue } from "../interfaces/mod.ts";
import {
  SERIALIZED_VALUE_DATATYPE_MEMBER,
  SERIALIZED_VALUE_VALUE_MEMBER,
} from "../constants/mod.ts";

export function isBinaryValue(value: unknown): value is SerializedValue {
  return isObject(value) && SERIALIZED_VALUE_DATATYPE_MEMBER in value &&
    SERIALIZED_VALUE_VALUE_MEMBER in value;
}
