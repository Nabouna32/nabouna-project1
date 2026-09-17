export const SPEED_UNITS = ["mbps", "gbps", "ko-s", "mo-s", "go-s"] as const;

export type SpeedUnit = (typeof SPEED_UNITS)[number];

const BITS_PER_UNIT: Record<SpeedUnit, number> = {
  mbps: 1_000_000,
  gbps: 1_000_000_000,
  "ko-s": 8_000,
  "mo-s": 8_000_000,
  "go-s": 8_000_000_000,
};

export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError("La valeur doit être un nombre positif ou nul.");
  }

  return (value * BITS_PER_UNIT[from]) / BITS_PER_UNIT[to];
}
