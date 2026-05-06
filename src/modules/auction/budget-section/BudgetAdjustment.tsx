import { useTranslation } from "react-i18next";

type BudgetAdjustmentProps = {
  budget: number;
  onBudgetChange: (budget: number) => void;
  label?: string;
  helperText?: string;
  min?: number;
  step?: number;
};

const parseBudgetInput = (value: string) => {
  const parsedValue = Number.parseFloat(value);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return 0;
  }

  return parsedValue;
};

export function BudgetAdjustment({
  budget,
  onBudgetChange,
  label,
  helperText,
  min = 0,
  step = 10,
}: BudgetAdjustmentProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium mb-2">
        {label ?? t("auction.adjustBudgetLabel")}
      </label>
      <input
        type="number"
        min={min}
        step={step}
        value={budget}
        onChange={e => onBudgetChange(parseBudgetInput(e.target.value))}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <p className="mt-2 text-xs text-gray-500">{helperText ?? t("auction.adjustBudgetHelper")}</p>
    </div>
  );
}
