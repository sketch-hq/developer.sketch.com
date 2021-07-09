import { DeclarationReflection, ReflectionKind } from 'typedoc';


export function ifIsEnumeration(this: DeclarationReflection, options) {
  if (this.kind == ReflectionKind.Enum) {
    return options.fn(this);
  }
}

export function ifIsEnumerationMember(this: DeclarationReflection, options) {
  if (this.kind == ReflectionKind.Enum) {
    return options.fn(this);
  }
}