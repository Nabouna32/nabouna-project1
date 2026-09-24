import type { ReactNode } from "react";
import { ResultPanel } from "@/components/ui/ResultPanel";

type CalculatorResultProps = {
  label: string;
  value: ReactNode;
  tone?: "accent" | "neutral";
};

export function CalculatorResult(props: CalculatorResultProps) {
  return <ResultPanel {...props} />;
}
