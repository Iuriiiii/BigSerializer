import type { NativeMetadata, SerializableNativeClass } from "../types/mod.ts";

export const BINARY_METADATA = new Map<NativeMetadata, SerializableNativeClass>(
  [
    ["Date", Date],
    ["Uint8Array", Uint8Array],
    ["Int8Array", Int8Array],
    ["Uint16Array", Uint16Array],
    ["Int16Array", Int16Array],
    ["Uint32Array", Uint32Array],
    ["Int32Array", Int32Array],
    ["BigUint64Array", BigUint64Array],
    ["BigInt64Array", BigInt64Array],
    ["Float16Array", Float16Array],
    ["Float32Array", Float32Array],
    ["Float64Array", Float64Array],
    ["RegExp", RegExp],
    ["Error", Error],
  ] as Iterable<[NativeMetadata, SerializableNativeClass]>,
);
