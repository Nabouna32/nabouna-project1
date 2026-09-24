import { useLocale } from "@/lib/i18n/use-locale";
import { Button } from "@/components/ui/Button";

type CalculatorActionsProps = {
  showClear: boolean;
  onClear: () => void;
};

export function CalculatorActions({ showClear, onClear }: CalculatorActionsProps) {
  const locale = useLocale();
  if (!showClear) return null;

  return (
    <div className="flex items-center justify-end">
      <Button variant="secondary" onClick={onClear}>
        <span aria-hidden="true">↺</span>
        {locale === "fr" ? "Effacer" : "Clear"}
      </Button>
    </div>
  );
}
