// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import { isClassObject } from "./mod.ts";
import { isPlainObject } from "./mod.ts";
import { isObject } from "./mod.ts";

export function isSerializableObject(value: unknown): boolean {
  return (
    isPlainObject(value) ||
    (isObject(value) &&
      !isClassObject(value) &&
      value.constructor.name === "Serializable")
  );
}
