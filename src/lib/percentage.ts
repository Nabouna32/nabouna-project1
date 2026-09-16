export function calculatePercentage(percentage: number, value: number): number {
  return (percentage / 100) * value;
}

export function calculateEvolution(
  finalValue: number,
  startingValue: number,
): number | null {
  if (startingValue === 0) {
    return null;
  }

  return ((finalValue - startingValue) / startingValue) * 100;
}

export function calculateDifference(
  firstValue: number,
  secondValue: number,
): number | null {
  const average = (Math.abs(firstValue) + Math.abs(secondValue)) / 2;

  if (average === 0) {
    return null;
  }

  return (Math.abs(firstValue - secondValue) / average) * 100;
}
