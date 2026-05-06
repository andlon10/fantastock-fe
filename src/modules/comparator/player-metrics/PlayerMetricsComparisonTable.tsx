import { useTranslation } from "react-i18next";
import { Player } from "../../../_common/types";
import {
  getPlayerMetricDefinitions,
  getPlayerMetricsTableText,
  PlayerMetricKey,
} from "../constants";

type PlayerMetricsComparisonTableProps = {
  player1: Player | null;
  player2: Player | null;
};

type MetricRow = {
  key: PlayerMetricKey;
  label: string;
  description: string;
  getValue: (player: Player) => string | number | null | undefined;
};

const metricValueByKey: Record<
  PlayerMetricKey,
  (player: Player) => string | number | null | undefined
> = {
  PI: player => player.PI,
  FOI: player => player.FOI,
  ProjectionGap: player => player.ProjectionGap,
  Goals: player => player.goals,
  Assists: player => player.assists,
  xG: player => player.xG.toFixed(2),
  xA: player => player.xA.toFixed(2),
  Minutes: player => player.minutes,
};

const formatCellValue = (value: string | number | null | undefined, emptyValue: string) => {
  if (value === null || value === undefined) return emptyValue;
  if (typeof value === "number" && Number.isNaN(value)) return emptyValue;
  return value;
};

export function PlayerMetricsComparisonTable({
  player1,
  player2,
}: PlayerMetricsComparisonTableProps) {
  const { t } = useTranslation();

  const tableText = getPlayerMetricsTableText(t);
  const metricRows: MetricRow[] = getPlayerMetricDefinitions(t).map(metric => ({
    ...metric,
    getValue: metricValueByKey[metric.key],
  }));

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-2">{t("comparator.metricsTitle")}</h2>
      <p className="text-sm text-gray-600 mb-4">{t("comparator.metricsDescription")}</p>
      <table className="table w-full text-base-content bg-base-100">
        <thead>
          <tr className="bg-base-200 text-base-content">
            <th className="text-base-content">{tableText.metricHeading}</th>
            <th className="text-base-content">
              <div className="text-xs uppercase opacity-70">{tableText.playerOneHeading}</div>
              <div>{player1 ? `${player1.name} (${player1.team})` : tableText.selectPlayer}</div>
            </th>
            <th className="text-base-content">
              <div className="text-xs uppercase opacity-70">{tableText.playerTwoHeading}</div>
              <div>{player2 ? `${player2.name} (${player2.team})` : tableText.selectPlayer}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {metricRows.map(row => (
            <tr key={row.label} className="text-base-content even:bg-base-200/40">
              <td className="font-semibold text-base-content">
                <div className="tooltip tooltip-right" data-tip={row.description}>
                  <span className="cursor-help border-b border-dotted border-base-content/40">
                    {row.label}
                  </span>
                </div>
              </td>
              <td className="text-base-content">
                {player1
                  ? formatCellValue(row.getValue(player1), tableText.emptyValue)
                  : tableText.emptyValue}
              </td>
              <td className="text-base-content">
                {player2
                  ? formatCellValue(row.getValue(player2), tableText.emptyValue)
                  : tableText.emptyValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
