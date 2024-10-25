import {
  isDate,
  isRegex,
  isSerializableNativeClass,
} from "../validators/mod.ts";

export function serializeMetadata(value: unknown): string {
  switch (true) {
    case isDate(value) || isRegex(value) || isSerializableNativeClass(value):
      return value.constructor.name;
    default:
      // @ts-ignore: Get original class name.
      return value.originalName;
  }
}
