
export function urlFriendlyName(word: string) {
  if (!word) return word;
  word = word.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return word;
}

export function stripMdExt(path: string | undefined): string {
  if (!path) return '';
  return path.replace(/(.*)(\.md)/, "$1");
}
