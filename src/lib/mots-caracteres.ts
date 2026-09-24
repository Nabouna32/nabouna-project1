export type TextStats = {
  characters: number;
  charactersWithoutSpaces: number;
  words: number;
  spaces: number;
  lines: number;
};

const wordPattern = /[\p{L}\p{N}\p{M}]+(?:['’\u2011-][\p{L}\p{N}\p{M}]+)*/gu;

export function countTextStats(text: string): TextStats {
  const characters = Array.from(text).length;
  const charactersWithoutSpaces = Array.from(text.replace(/\s/gu, "")).length;
  const words = text.match(wordPattern)?.length ?? 0;
  const spaces = text.match(/[^\S\r\n]/gu)?.length ?? 0;
  const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/gu).length;

  return { characters, charactersWithoutSpaces, words, spaces, lines };
}
