export type Duration = {
  days: number;
  hours: number;
  minutes: number;
};

const MINUTES_PER_DAY = 24 * 60;

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

export function calculateDateDuration(startDate: Date, endDate: Date): Duration | null {
  const startTime = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endTime = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  if (!isFiniteNumber(startTime) || !isFiniteNumber(endTime) || startTime > endTime) {
    return null;
  }

  const totalMinutes = Math.floor((endTime - startTime) / 60000);
  const days = Math.floor(totalMinutes / MINUTES_PER_DAY);
  const minutes = totalMinutes % MINUTES_PER_DAY;

  return {
    days,
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };
}

function parseTime(value: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;

  return hours * 60 + minutes;
}

export function calculateTimeDuration(startTime: string, endTime: string): Duration | null {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  if (start === null || end === null) return null;

  const totalMinutes = (end - start + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  return {
    days: 0,
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}
