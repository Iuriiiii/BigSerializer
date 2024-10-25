import type { SerializedValue } from "../interfaces/mod.ts";
import { SERIALIZED_VALUE_DATATYPE_MEMBER } from "./serialized-value-datatype-member.constant.ts";
import { SERIALIZED_VALUE_VALUE_MEMBER } from "./serialized-value-value-member.constant.ts";

export const SERIALIZED_VALUE_EMPTY = {
  [SERIALIZED_VALUE_DATATYPE_MEMBER]: "empty",
  [SERIALIZED_VALUE_VALUE_MEMBER]: null,
} satisfies SerializedValue as SerializedValue;
