export type Age = {
  years: number;
  months: number;
  days: number;
};

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

export function calculateAge(birthDate: Date, referenceDate: Date): Age | null {
  if (!isValidDate(birthDate) || !isValidDate(referenceDate) || birthDate > referenceDate) {
    return null;
  }

  let years = referenceDate.getFullYear() - birthDate.getFullYear();
  let months = referenceDate.getMonth() - birthDate.getMonth();
  let days = referenceDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}
