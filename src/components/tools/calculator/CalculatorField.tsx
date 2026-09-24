import type { InputHTMLAttributes } from "react";
import { TextField } from "@/components/ui/TextField";

type CalculatorFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  inputId: string;
  unit?: string;
};

export function CalculatorField(props: CalculatorFieldProps) {
  return <TextField {...props} type={props.type ?? "number"} />;
}
