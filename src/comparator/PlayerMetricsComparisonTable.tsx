import { Player } from "../_common/types";
import { PLAYER_METRIC_DEFINITIONS, PLAYER_METRICS_TABLE_TEXT, PlayerMetricKey } from "./constants";

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

const metricRows: MetricRow[] = PLAYER_METRIC_DEFINITIONS.map(metric => ({
  ...metric,
  getValue: metricValueByKey[metric.key],
}));

const formatCellValue = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return PLAYER_METRICS_TABLE_TEXT.emptyValue;
  if (typeof value === "number" && Number.isNaN(value)) return PLAYER_METRICS_TABLE_TEXT.emptyValue;
  return value;
};

export function PlayerMetricsComparisonTable({
  player1,
  player2,
}: PlayerMetricsComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full text-base-content bg-base-100">
        <thead>
          <tr className="bg-base-200 text-base-content">
            <th className="text-base-content">{PLAYER_METRICS_TABLE_TEXT.metricHeading}</th>
            <th className="text-base-content">
              <div className="text-xs uppercase opacity-70">
                {PLAYER_METRICS_TABLE_TEXT.playerOneHeading}
              </div>
              <div>
                {player1
                  ? `${player1.name} (${player1.team})`
                  : PLAYER_METRICS_TABLE_TEXT.selectPlayer}
              </div>
            </th>
            <th className="text-base-content">
              <div className="text-xs uppercase opacity-70">
                {PLAYER_METRICS_TABLE_TEXT.playerTwoHeading}
              </div>
              <div>
                {player2
                  ? `${player2.name} (${player2.team})`
                  : PLAYER_METRICS_TABLE_TEXT.selectPlayer}
              </div>
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
                  ? formatCellValue(row.getValue(player1))
                  : PLAYER_METRICS_TABLE_TEXT.emptyValue}
              </td>
              <td className="text-base-content">
                {player2
                  ? formatCellValue(row.getValue(player2))
                  : PLAYER_METRICS_TABLE_TEXT.emptyValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
