
export function toTitleCase(word: string | undefined): string {
  if (!word) return '';
  return word[0].toUpperCase() + word.substr(1);
}

