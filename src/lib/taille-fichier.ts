export type DurationUnit = "seconds" | "minutes" | "hours";
export type BitrateUnit = "kbps" | "mbps" | "gbps";
export type FileSizeUnit = "mb" | "gb";

const DURATION_MULTIPLIERS: Record<DurationUnit, number> = { seconds: 1, minutes: 60, hours: 3600 };
const BITRATE_MULTIPLIERS: Record<BitrateUnit, number> = { kbps: 1_000, mbps: 1_000_000, gbps: 1_000_000_000 };
const FILE_SIZE_MULTIPLIERS: Record<FileSizeUnit, number> = { mb: 1_000_000, gb: 1_000_000_000 };

export function calculateFileSize(
  duration: number,
  durationUnit: DurationUnit,
  bitrate: number,
  bitrateUnit: BitrateUnit,
  sizeUnit: FileSizeUnit,
): number | null {
  if (!Number.isFinite(duration) || duration < 0 || !Number.isFinite(bitrate) || bitrate < 0) return null;
  const durationSeconds = duration * DURATION_MULTIPLIERS[durationUnit];
  const bitrateBitsPerSecond = bitrate * BITRATE_MULTIPLIERS[bitrateUnit];
  const bytes = (durationSeconds * bitrateBitsPerSecond) / 8;
  return bytes / FILE_SIZE_MULTIPLIERS[sizeUnit];
}
