export type Duration = {
  days: number;
  hours: number;
  minutes: number;
};

const MINUTES_PER_DAY = 24 * 60;

function isValidDate(date: Date): boolean {
  return Number.isFinite(date.getTime());
}

export function calculateDateDuration(startDate: Date, endDate: Date): Duration | null {
  if (!isValidDate(startDate) || !isValidDate(endDate) || startDate > endDate) {
    return null;
  }

  const totalMinutes = Math.floor((endDate.getTime() - startDate.getTime()) / 60000);
  const days = Math.floor(totalMinutes / MINUTES_PER_DAY);
  const remainingMinutes = totalMinutes % MINUTES_PER_DAY;

  return {
    days,
    hours: Math.floor(remainingMinutes / 60),
    minutes: remainingMinutes % 60,
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
