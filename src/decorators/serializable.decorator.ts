// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
import { serializables } from "../singletons/mod.ts";
import type { Constructor } from "../types/mod.ts";
import { deserializeValue, serializeValue } from "../utils/mod.ts";

/**
 * Turns a class into a serializable class.
 * Use `serialize` and `deserialize`.
 */
// deno-lint-ignore no-explicit-any
export function Serializable(): any {
  return function (constructor: Constructor) {
    const _className = constructor.name;
    const Serializable = class extends constructor {
      originalName = _className;

      serialize(instances = new Map()) {
        const result: Record<string, unknown> = {};

        for (const field in this) {
          const value = this[field];

          // @ts-ignore: Access to instances param.
          result[field] = serializeValue(value, instances);
        }

        return result;
      }

      deserialize(serialized: Record<string, unknown>, instances = new Map()) {
        for (const field in serialized) {
          const value = serialized[field];

          // @ts-ignore: Update current class.
          this[field] = deserializeValue(value, instances);
        }

        return this;
      }
    };

    serializables.set(Serializable, _className);
    serializables.set(_className, Serializable);

    // @ts-ignore: Force classes compatibility
    // deno-lint-ignore no-explicit-any
    return Serializable as any;
  };
}
