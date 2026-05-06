import { useTranslation } from "react-i18next";
import { BudgetAdjustment } from "./BudgetAdjustment";

type BudgetStatsProps = {
  budget: number;
  remainingBudget: number;
  totalSpent: number;
  onBudgetChange: (budget: number) => void;
};

export function BudgetStats({
  budget,
  remainingBudget,
  totalSpent,
  onBudgetChange,
}: BudgetStatsProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("auction.budgetOverview")}</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">{t("auction.totalBudget")}</p>
          <p className="text-3xl font-bold text-gray-900">${budget.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">{t("auction.totalSpent")}</p>
          <p className="text-3xl font-bold text-blue-900">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">{t("auction.remainingBudget")}</p>
          <p
            className={`text-3xl font-bold ${remainingBudget >= 0 ? "text-green-900" : "text-red-900"}`}
          >
            ${remainingBudget.toFixed(2)}
          </p>
        </div>

        <BudgetAdjustment budget={budget} onBudgetChange={onBudgetChange} />
      </div>
    </div>
  );
}
