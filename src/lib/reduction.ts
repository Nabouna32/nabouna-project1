export function calculateDiscountAmount(price: number, discountRate: number): number {
  return (price * discountRate) / 100;
}

export function calculateDiscountedPrice(
  price: number,
  discountRate: number,
): number {
  return price - calculateDiscountAmount(price, discountRate);
}

export function isValidDiscountRate(discountRate: number): boolean {
  return Number.isFinite(discountRate) && discountRate >= 0 && discountRate <= 100;
}

export function isValidReductionPrice(price: number): boolean {
  return Number.isFinite(price) && price > 0;
}
