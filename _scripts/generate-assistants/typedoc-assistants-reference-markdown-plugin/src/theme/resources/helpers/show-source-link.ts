import { DeclarationReflection } from 'typedoc';
import { SourceReference } from 'typedoc/dist/lib/models/sources'


export function showSourceLink(this: DeclarationReflection, options) {
  if (this.sources && this.sources.length > 0) {
    const source: SourceReference | undefined =
      this.sources.find((source: SourceReference) => !!source.url);

    if (source && source.url) {
      const url: string = source.url || '';
      return `[ ](${url})`;
    }
  }
  return '';
}