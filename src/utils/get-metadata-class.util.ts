import { BINARY_METADATA } from "../constants/mod.ts";
import type { NativeMetadata } from "../types/mod.ts";

export function getMetadataClass(metadata: NativeMetadata) {
  return BINARY_METADATA.get(metadata);
}
