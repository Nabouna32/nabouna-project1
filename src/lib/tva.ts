export function calculateTtc(ht: number, rate: number): number {
  return ht * (1 + rate / 100);
}

export function calculateHt(ttc: number, rate: number): number {
  return ttc / (1 + rate / 100);
}

export function calculateVatAmount(ht: number, rate: number): number {
  return calculateTtc(ht, rate) - ht;
}

export function isValidVatRate(rate: number): boolean {
  return Number.isFinite(rate) && rate >= 0 && rate <= 100;
}
