// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import type {
  SERIALIZED_VALUE_DATATYPE_MEMBER,
  SERIALIZED_VALUE_INSTANCE_ID_MEMBER,
  SERIALIZED_VALUE_METADATA_MEMBER,
  SERIALIZED_VALUE_VALUE_MEMBER,
} from "../constants/mod.ts";

export interface SerializedValue {
  [SERIALIZED_VALUE_DATATYPE_MEMBER]: "date" | "class" | "instance" | "object";
  [SERIALIZED_VALUE_VALUE_MEMBER]: unknown;
  [SERIALIZED_VALUE_METADATA_MEMBER]?: string;
  [SERIALIZED_VALUE_INSTANCE_ID_MEMBER]?: string;
}
