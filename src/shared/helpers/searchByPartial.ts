export function searchByPartial(substring: string, word: string) {
  return word.toLowerCase().includes(substring.toLowerCase());
}