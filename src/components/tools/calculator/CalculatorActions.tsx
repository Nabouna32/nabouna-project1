import { ClearButton } from "@/components/ui/ClearButton";

type CalculatorActionsProps = {
  showClear: boolean;
  onClear: () => void;
};

export function CalculatorActions({ showClear, onClear }: CalculatorActionsProps) {
  if (!showClear) return null;
  return <ClearButton onClear={onClear} />;
}
