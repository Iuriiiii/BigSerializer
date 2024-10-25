import { isError } from "../validators/is-error.validator.ts";
import {
  isDate,
  isRegex,
  isSerializableNativeClass,
} from "../validators/mod.ts";

export function serializeClassArgument(
  value: unknown,
  instances: Map<unknown, unknown>,
): unknown {
  switch (true) {
    case isDate(value):
      return (value as Date).toISOString();
    case isRegex(value):
      return [(value as RegExp).source, (value as RegExp).flags];
    case isError(value):
      return [
        value.message,
        value.cause ? { cause: value.cause } : void 0,
      ];
    case (isSerializableNativeClass(value)):
      return Array.from(value as Uint8Array);
    default:
      // @ts-ignore: Use serialize method.
      return value.serialize(instances);
  }
}
