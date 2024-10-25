// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
export interface BinaryValue {
  dataType: "class" | "instance" | "object";
  value: unknown;
  reference?: string;
}
