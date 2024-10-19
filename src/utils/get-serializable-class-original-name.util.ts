// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import { isClassObject } from "../validators/mod.ts";

export function getSerializableClassOriginalName(clazz: object): string | null {
  return isClassObject(clazz) && "originalName" in clazz
    ? (clazz.originalName as string)
    : null;
}
