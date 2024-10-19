// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
export function isObject(value: unknown): value is Object {
  return typeof value === "object" && value !== null;
}
