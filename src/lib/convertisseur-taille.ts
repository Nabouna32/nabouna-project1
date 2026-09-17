export const SIZE_UNITS = ["o", "ko", "mo", "go", "to"] as const;

export type SizeUnit = (typeof SIZE_UNITS)[number];

const BYTES_PER_UNIT: Record<SizeUnit, number> = {
  o: 1,
  ko: 1024,
  mo: 1024 ** 2,
  go: 1024 ** 3,
  to: 1024 ** 4,
};

export function convertFileSize(
  value: number,
  from: SizeUnit,
  to: SizeUnit,
): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError("La valeur doit être un nombre positif ou nul.");
  }

  return (value * BYTES_PER_UNIT[from]) / BYTES_PER_UNIT[to];
}
