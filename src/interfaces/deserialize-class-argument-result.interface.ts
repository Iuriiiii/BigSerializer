import type { Constructor } from "../types/mod.ts";

export interface DeserializeClassArgumentResult {
  args: unknown[];
  clazz?: Constructor;
}
