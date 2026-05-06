import { useTranslation } from "react-i18next";

type PositionBreakdownProps = {
  positions: string[];
  budgetPerPosition: number[];
  positionColors: Record<string, string>;
  title?: string;
};

export function PositionBreakdown({
  positions,
  budgetPerPosition,
  positionColors,
  title,
}: PositionBreakdownProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-6 pt-6 border-t">
      <h3 className="text-lg font-semibold mb-4">{title ?? t("auction.spendingByPosition")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {positions.map((position, index) => (
          <div
            key={position}
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${positionColors[position] ?? "#e5e7eb"}20` }}
          >
            <p className="text-sm font-medium text-gray-600">{t(`common.positions.${position}`)}</p>
            <p className="text-xl font-bold mt-1">${(budgetPerPosition[index] ?? 0).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
