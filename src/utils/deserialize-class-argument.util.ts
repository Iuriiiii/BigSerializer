import type { DeserializeClassArgumentResult } from "../interfaces/mod.ts";
import type { NativeMetadata } from "../types/mod.ts";
import { getMetadataClass } from "./get-metadata-class.util.ts";
import { deserializeValue } from "./mod.ts";

export function deserializeClassArgument(
  serializedArgument: unknown,
  className: NativeMetadata,
  instances = new Map(),
) {
  const metadataClass = getMetadataClass(className! as NativeMetadata);
  const args: unknown[] = [];
  const result: DeserializeClassArgumentResult = {
    args,
    // @ts-ignore: Set member value.
    clazz: metadataClass,
  };

  if (!metadataClass) {
    return result;
  }

  switch (metadataClass) {
    // @ts-ignore: Check type
    case RegExp, Error:
      args.push(...serializedArgument as Array<unknown>);
      break;
    default:
      if (metadataClass) {
        // @ts-ignore: Add instances argument.
        args.push(deserializeValue(serializedArgument, instances));
      }
      break;
  }

  return result;
}
