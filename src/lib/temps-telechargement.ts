export const DOWNLOAD_SIZE_UNITS = ["ko", "mo", "go", "to"] as const;
export const DOWNLOAD_SPEED_UNITS = ["kbps", "mbps", "gbps", "ko-s", "mo-s", "go-s"] as const;

export type DownloadSizeUnit = (typeof DOWNLOAD_SIZE_UNITS)[number];
export type DownloadSpeedUnit = (typeof DOWNLOAD_SPEED_UNITS)[number];

const BYTES_PER_SIZE_UNIT: Record<DownloadSizeUnit, number> = {
  ko: 1_000,
  mo: 1_000_000,
  go: 1_000_000_000,
  to: 1_000_000_000_000,
};

const BITS_PER_SPEED_UNIT: Record<DownloadSpeedUnit, number> = {
  kbps: 1_000,
  mbps: 1_000_000,
  gbps: 1_000_000_000,
  "ko-s": 1_000 * 8,
  "mo-s": 1_000_000 * 8,
  "go-s": 1_000_000_000 * 8,
};

export type DownloadDuration = {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function calculateDownloadTime(
  size: number,
  sizeUnit: DownloadSizeUnit,
  speed: number,
  speedUnit: DownloadSpeedUnit,
): DownloadDuration | null {
  if (!Number.isFinite(size) || size < 0 || !Number.isFinite(speed) || speed <= 0) {
    return null;
  }

  const totalSeconds =
    (size * BYTES_PER_SIZE_UNIT[sizeUnit] * 8) / (speed * BITS_PER_SPEED_UNIT[speedUnit]);
  const roundedSeconds = Math.ceil(totalSeconds);
  const days = Math.floor(roundedSeconds / 86_400);
  const hours = Math.floor((roundedSeconds % 86_400) / 3_600);
  const minutes = Math.floor((roundedSeconds % 3_600) / 60);
  const seconds = roundedSeconds % 60;

  return { totalSeconds, days, hours, minutes, seconds };
}
