import type { SerializableNativeClass } from "../types/mod.ts";

export function isSerializableNativeClass(
  value: unknown,
): value is SerializableNativeClass {
  return value instanceof Uint8Array ||
    value instanceof Error ||
    value instanceof Uint16Array ||
    value instanceof Uint32Array ||
    value instanceof Int8Array ||
    value instanceof Int16Array ||
    value instanceof Int32Array ||
    value instanceof Float16Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array ||
    value instanceof BigInt64Array ||
    value instanceof BigUint64Array ||
    value instanceof Uint8ClampedArray;
}
